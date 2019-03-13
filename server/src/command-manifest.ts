// TODO reuse code from lib

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
  redirect?: string[];
  children?: CommandNodeChildren;

  // FIXME these aren't part of the raw data format
  breadcrumb: string[];
  depth: number;
}

export interface CommandManifest extends CommandNode {}
