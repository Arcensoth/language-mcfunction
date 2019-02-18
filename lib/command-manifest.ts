export enum CommandNodeType {
  LITERAL = "literal",
  ARGUMENT = "argument"
}

export interface CommandNode {
  type: CommandNodeType;
  parser?: string;
  properties?: {};
  executable?: boolean;
  children: { [name: string]: CommandNode };
}

export interface CommandManifest extends CommandNode {}
