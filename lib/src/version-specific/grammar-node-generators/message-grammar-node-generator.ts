import { GrammarNode } from "../../language-grammar";
import { CommandNodeContext } from "../command-node-context";
import { nodes } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class MessageGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // NOTE This does not preserve context.
    // The message parser is greedy and consumes the entire line by definition.
    return {
      patterns: [{ include: nodes.common.message }]
    };
  }
}
