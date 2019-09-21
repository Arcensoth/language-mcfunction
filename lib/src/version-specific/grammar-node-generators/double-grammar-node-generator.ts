import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class DoubleGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
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
