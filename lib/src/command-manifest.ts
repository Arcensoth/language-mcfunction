import { GrammarNode } from "./language-grammar";
import { makeGrammarGroupName } from "./version-specific/utils";

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

  get execSuffix(): string {
    return this.node.executable ? "{{cbx_true}}" : "{{cbx_false}}";
  }

  get components(): string[] {
    return [...this.breadcrumb, this.name];
  }

  get groupName(): string {
    return makeGrammarGroupName(...this.components);
  }

  get groupInclude(): string {
    return `#${this.groupName}`;
  }

  get groupPatterns(): GrammarNode[] {
    return [{ include: this.groupInclude }];
  }

  appendExec(s: string): string {
    return `${s}${this.execSuffix}`;
  }
}
