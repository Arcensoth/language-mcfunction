import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class BlockPositionGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // We use a separate pattern for local coords as they cannot be mixed.
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.blockPosition.absoluteRelative),
          end: patterns.newLine,
          beginCaptures: captures.blockPosition.absoluteRelative,
          patterns: context.groupPatterns
        },
        {
          begin: context.appendExec(patterns.blockPosition.local),
          end: patterns.newLine,
          beginCaptures: captures.blockPosition.local,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
