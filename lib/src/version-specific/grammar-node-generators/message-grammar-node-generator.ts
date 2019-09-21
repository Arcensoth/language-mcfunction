import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns, nodes } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class MessageGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // NOTE Since the message parser is greedy, we don't need to worry about
    // preserving the context here.
    return {
      patterns: [{ include: nodes.common.message }]
    };
  }
}
