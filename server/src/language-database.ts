import fs = require("fs");
import path = require("path");

import {
  TextDocument,
  Position,
  CompletionItemKind,
  CompletionItem
} from "vscode-languageserver";

import { CommandManifest, CommandNode } from "./command-manifest";

export interface LanguageData {
  commands: CommandManifest;
}

export class LanguageDatabase {
  private cache: { [languageId: string]: LanguageData } = {};

  private loadLanguage(languageId: string) {
    const dataFilePath = path.resolve(
      path.join("server", "src", "data", `${languageId}.json`)
    );
    const languageData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    this.cache[languageId] = languageData;
  }

  getLanguage(languageId: string): LanguageData {
    if (!this.cache.hasOwnProperty(languageId)) {
      this.loadLanguage(languageId);
    }
    return this.cache[languageId];
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

  getCommandNode(languageId: string, commandText: string): CommandNode {
    const languageData = this.getLanguage(languageId);

    // FIXME consider argument types

    const tokens = commandText.split(" ");
    tokens.pop();

    const rootCommandNode = languageData.commands;
    let commandNode = rootCommandNode;

    let breadcrumb = [];
    let depth = 0;

    tokens.forEach(token => {
      if (!commandNode) {
        return;
      }

      breadcrumb.push(token);
      depth += 1;

      if (commandNode.children) {
        if (token in commandNode.children) {
          commandNode = commandNode.children[token];
        } else {
          commandNode = undefined;
          return;
        }
      }

      if (commandNode.redirect) {
        depth = 0;
        const redirects = commandNode.redirect;
        commandNode = rootCommandNode;
        redirects.forEach(redirect => {
          commandNode = commandNode.children[redirect];
        });
      }

      if (
        !(
          commandNode.children ||
          commandNode.redirect ||
          commandNode.executable
        )
      ) {
        // special-case for root redirect
        depth = 0;
        commandNode = rootCommandNode;
      }
    });

    if (commandNode === undefined) {
      commandNode = {} as CommandNode;
    }

    commandNode.breadcrumb = breadcrumb;
    commandNode.depth = depth;

    return commandNode;
  }

  getCompletionItemData(commandNode: CommandNode): string {
    return commandNode.breadcrumb.join(".");
  }

  getCompletions(document: TextDocument, position: Position): CompletionItem[] {
    const commandText = this.getCommandText(document, position);
    const commandNode = this.getCommandNode(document.languageId, commandText);

    let completions: CompletionItem[] = [];

    if (commandNode.children !== undefined) {
      Object.keys(commandNode.children).forEach(childName => {
        const childNode = commandNode.children[childName];
        if (childNode["type"] === "literal") {
          if (commandNode.depth > 0) {
            completions.push({
              kind: CompletionItemKind.Field,
              label: childName,
              data: this.getCompletionItemData(commandNode),
              insertText: childName + " "
            });
          } else {
            completions.push({
              kind: CompletionItemKind.Function,
              label: childName,
              data: this.getCompletionItemData(commandNode),
              insertText: childName + " "
            });
          }
        } else if (childNode["type"] === "argument") {
          completions.push({
            kind: CompletionItemKind.Value,
            label: childName,
            data: this.getCompletionItemData(commandNode),
            insertText: childName + " "
          });
        }
      });
    }

    return completions;
  }

  getCompletionDetails(item: CompletionItem): CompletionItem {
    // FIXME resolve completion item details
    item.detail = "TODO detail";
    item.documentation = "TODO documentation";
    return item;
  }
}
