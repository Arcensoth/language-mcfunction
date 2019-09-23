import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class IntRangeGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        // right side optional
        {
          begin: context.appendExec(patterns.intRange.left),
          end: patterns.newLine,
          beginCaptures: captures.intRange.left,
          patterns: context.groupPatterns
        },

        // left side optional
        {
          begin: context.appendExec(patterns.intRange.right),
          end: patterns.newLine,
          beginCaptures: captures.intRange.right,
          patterns: context.groupPatterns
        },

        // exact number
        {
          begin: context.appendExec(patterns.integer),
          end: patterns.newLine,
          beginCaptures: captures.integer,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
