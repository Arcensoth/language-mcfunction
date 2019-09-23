import { CommandNodeContext } from "../../../command-manifest";
import { GrammarNode } from "../../../language-grammar";

export abstract class GrammarNodeGenerator {
  abstract generate(context: CommandNodeContext): GrammarNode;
}
