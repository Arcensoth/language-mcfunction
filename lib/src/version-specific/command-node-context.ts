import { CommandNode } from "./command-node";
import { GrammarNode } from "../language-grammar";
import { makeGrammarGroupName } from "./utils";

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
