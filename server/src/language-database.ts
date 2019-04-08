import fs = require("fs");
import path = require("path");

import {
  TextDocument,
  Position,
  CompletionItemKind,
  CompletionItem
} from "vscode-languageserver";

import { CommandParser, CommandParserState } from "./command-parser";
import { RawLanguageData } from "./raw-language-data";
import { LanguageData } from "./language-data";
import { CommandNode, CommandNodeType, makeCommandTree } from "./command-node";

export class LanguageDatabase {
  private languageCache: { [languageId: string]: LanguageData } = {};
  private parserCache: { [languageId: string]: CommandParser } = {};

  private loadLanguage(languageId: string) {
    const dataFilePath = path.resolve(
      path.join("server", "src", "data", `${languageId}.json`)
    );

    const rawData: RawLanguageData = JSON.parse(
      fs.readFileSync(dataFilePath, "utf8")
    );

    const languageData = this.makeLanguageData(rawData);

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

  makeLanguageData(rawData: RawLanguageData): LanguageData {
    return {
      commands: makeCommandTree(rawData.commands)
    };
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

  completionizeCommandNodes(commandNodes: CommandNode[]): CompletionItem[] {
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
    commandNode: CommandNode,
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

  gatherMatchingCommandNodes(parserState: CommandParserState): CommandNode[] {
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
