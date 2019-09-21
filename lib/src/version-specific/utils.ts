import { CommandNode } from "../command-manifest";

export function makeCommandNodeChildNames(commandNode: CommandNode): string[] {
  return Object.keys(commandNode.children ? commandNode.children : []);
}

export function makeGrammarNodeName(...components: string[]): string {
  return "generated.command." + components.join(".");
}

export function makeGrammarGroupName(...components: string[]): string {
  return "generated.commands." + components.join(".");
}
