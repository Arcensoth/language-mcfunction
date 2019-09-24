export enum CommandNodeType {
  ROOT = "root",
  LITERAL = "literal",
  ARGUMENT = "argument"
}

export interface CommandNodeChildren {
  [name: string]: CommandNode;
}

export interface CommandNode {
  type: CommandNodeType;
  parser?: string;
  properties?: {};
  executable?: boolean;
  children?: CommandNodeChildren;
  redirect?: string[];
}
