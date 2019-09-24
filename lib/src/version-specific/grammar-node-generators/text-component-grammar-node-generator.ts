import { GrammarNode } from "../../language-grammar";
import { CommandNodeContext } from "../command-node-context";
import { nodes } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class TextComponentGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // NOTE This does not preserve context.
    // Currently there are no commands with a text component argument anywhere
    // but the very end. If this ever changes, we'll need to do something
    // similar to selectors and capture the "begin" and "end" separately.
    return {
      patterns: [{ include: nodes.textComponent }]
    };
  }
}
