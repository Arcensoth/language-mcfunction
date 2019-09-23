import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class SwizzleGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.swizzle),
          end: patterns.newLine,
          beginCaptures: captures.swizzle,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
