import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class EntityGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // FIXME implement
    return { patterns: [] };
  }
}
