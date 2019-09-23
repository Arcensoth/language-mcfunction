import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class RangeGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        // right side optional
        {
          begin: context.appendExec(patterns.range.left),
          end: patterns.newLine,
          beginCaptures: captures.range.left,
          patterns: context.groupPatterns
        },

        // left side optional
        {
          begin: context.appendExec(patterns.range.right),
          end: patterns.newLine,
          beginCaptures: captures.range.right,
          patterns: context.groupPatterns
        },

        // exact number
        {
          begin: context.appendExec(patterns.double),
          end: patterns.newLine,
          beginCaptures: captures.double,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
