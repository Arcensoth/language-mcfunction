import { GrammarNode } from "../../language-grammar";
import { CommandNodeContext } from "../command-node-context";
import { captures, nodes, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class NBTCompoundGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        {
          begin: patterns.nbtCompound.begin,
          end: patterns.newLine,
          beginCaptures: captures.nbtCompound.begin,
          patterns: [
            {
              begin: context.appendExec(patterns.nbtCompound.next),
              end: patterns.newLine,
              beginCaptures: captures.nbtCompound.next,
              patterns: context.groupPatterns
            },

            { include: nodes.nbtCompound.content },

            { include: nodes.error.badSyntax }
          ]
        }
      ]
    };
  }
}
