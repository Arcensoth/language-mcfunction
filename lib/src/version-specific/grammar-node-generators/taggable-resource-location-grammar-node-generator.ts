import { GrammarNode } from "../../language-grammar";
import { CommandNodeContext } from "../command-node-context";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class TaggableResourceLocationGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.resourceLocation),
          end: patterns.newLine,
          beginCaptures: captures.resourceLocation,
          patterns: context.groupPatterns
        },
        {
          begin: context.appendExec(patterns.taggedResourceLocation),
          end: patterns.newLine,
          beginCaptures: captures.taggedResourceLocation,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
