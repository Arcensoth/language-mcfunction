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
}

export interface CommandManifest extends CommandNode {}

export class CommandNodeContext {
  constructor(
    public node: CommandNode,
    public name: string,
    public breadcrumb: string[]
  ) {}
}
