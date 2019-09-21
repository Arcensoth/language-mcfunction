import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class MobEffectGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // NOTE We cannot reference "common.resource_id" from the base grammar.
    // We need to be able to append the executable token to the end of the
    // pattern, and proceed downwards through the command tree.
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.resourceID),
          end: patterns.newLine,
          beginCaptures: captures.resourceID,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
