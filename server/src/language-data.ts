import { CommandNode } from "./command-node";

export interface LanguageData {
  // TODO registries will eventually go here for id completion
  commands: CommandNode;
}
