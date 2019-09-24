import fs = require("fs");
import path = require("path");
import bson = require("bson");

import {
  CompletionItem,
  CompletionItemKind,
  Position,
  TextDocument
} from "vscode-languageserver";
import { CommandNodeType } from "../../lib/src/version-specific/command-node";
import { ResourceRegistries } from "../../lib/src/version-specific/resource-registries";
import { VersionData } from "../../lib/src/version-specific/version-data";
import { CommandParser, CommandParserState } from "./command-parser";
import {
  ExtendedCommandNode,
  makeCommandTree as extendCommandNode
} from "./extended-command-node";

// TODO consolidate VersionData and LanguageData (aka ExtendedVersionData)

export class LanguageData {
  constructor(
    public label: string,
    public commands: ExtendedCommandNode,
    public registries: ResourceRegistries
  ) {}
}

export class LanguageDatabase {
  private languageCache: { [languageId: string]: LanguageData } = {};
  private parserCache: { [languageId: string]: CommandParser } = {};

  private loadLanguage(languageId: string) {
    const dataFilePath = path.resolve(path.join("data", `${languageId}.bson`));

    const versionData = VersionData.fromFile(dataFilePath);
    const commands = extendCommandNode(versionData.commands);
    const languageData = new LanguageData(
      versionData.label,
      commands,
      versionData.registries
    );

    this.languageCache[languageId] = languageData;
  }

  private loadParser(languageId: string) {
    const languageData = this.getLanguage(languageId);
    const parser = new CommandParser(languageData);
    this.parserCache[languageId] = parser;
  }

  getLanguage(languageId: string): LanguageData {
    if (!this.languageCache.hasOwnProperty(languageId)) {
      this.loadLanguage(languageId);
    }
    return this.languageCache[languageId];
  }

  getParser(languageId: string): CommandParser {
    if (!this.parserCache.hasOwnProperty(languageId)) {
      this.loadParser(languageId);
    }
    return this.parserCache[languageId];
  }

  getCommandText(document: TextDocument, position: Position): string {
    const startPosition = { line: position.line, character: 0 };
    const endPosition = { line: position.line, character: position.character };
    const commandText = document
      .getText({
        start: startPosition,
        end: endPosition
      })
      .trimLeft();
    return commandText;
  }

  completionizeCommandNodes(
    commandNodes: ExtendedCommandNode[]
  ): CompletionItem[] {
    const completions: CompletionItem[] = [];

    commandNodes.forEach(node => {
      if (node.type === CommandNodeType.LITERAL) {
        if (node.parent.type === CommandNodeType.ROOT) {
          completions.push({
            kind: CompletionItemKind.Function,
            label: node.name,
            data: node.id,
            insertText: node.name + " "
          });
        } else {
          completions.push({
            kind: CompletionItemKind.Field,
            label: node.name,
            data: node.id,
            insertText: node.name + " "
          });
        }
      } else if (node.type === CommandNodeType.ARGUMENT) {
        completions.push({
          kind: CompletionItemKind.Value,
          // label: `<${node.name}>`,
          label: node.name,
          data: node.id,
          // insertText: `<${node.name}>` + " "
          insertText: node.name + " "
        });
      }
    });

    return completions;
  }

  doesCommandNodeMatchText(
    commandNode: ExtendedCommandNode,
    commandText: string
  ): boolean {
    if (commandNode.type === CommandNodeType.LITERAL) {
      // TODO can we do a fuzzy match? requires client backtracking; probably not
      return commandNode.name.startsWith(commandText);
    } else if (commandNode.type === CommandNodeType.ARGUMENT) {
      // TODO can we implement partial argument matching? also probably not
      return commandNode.name.startsWith(commandText);
    }
    return false;
  }

  gatherMatchingCommandNodes(
    parserState: CommandParserState
  ): ExtendedCommandNode[] {
    const matches = parserState.commandNode.childList.filter(childNode => {
      return this.doesCommandNodeMatchText(childNode, parserState.commandText);
    });
    return matches;
  }

  getCompletions(document: TextDocument, position: Position): CompletionItem[] {
    const commandText = this.getCommandText(document, position);
    const commandParser = this.getParser(document.languageId);

    // process the command as much as we can
    let finalState = commandParser.parse(commandText);

    // compare children of the final node to the remaining command text
    const matches = this.gatherMatchingCommandNodes(finalState);

    // turn matching children in completion items
    const completions = this.completionizeCommandNodes(matches);

    return completions;
  }

  getCompletionDetails(item: CompletionItem): CompletionItem {
    // FIXME resolve completion item details
    item.detail = "TODO detail";
    item.documentation = "TODO documentation";
    return item;
  }
}
