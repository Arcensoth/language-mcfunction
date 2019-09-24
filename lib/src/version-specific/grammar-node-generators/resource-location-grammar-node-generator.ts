import { GrammarNode } from "../../language-grammar";
import { CommandNodeContext } from "../command-node-context";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class ResourceLocationGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // NOTE Normal resource locations cannot be tags.
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.resourceLocation),
          end: patterns.newLine,
          beginCaptures: captures.resourceLocation,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
