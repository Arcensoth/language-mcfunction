import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class EntityAnchorGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.entityAnchor),
          end: patterns.newLine,
          beginCaptures: captures.entityAnchor,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
