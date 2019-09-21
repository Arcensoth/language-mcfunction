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
          begin: context.appendExec(patterns.position.absoluteRelative),
          end: patterns.newLine,
          beginCaptures: captures.position.absoluteRelative,
          patterns: context.groupPatterns
        },
        {
          begin: context.appendExec(patterns.position.local),
          end: patterns.newLine,
          beginCaptures: captures.position.local,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
