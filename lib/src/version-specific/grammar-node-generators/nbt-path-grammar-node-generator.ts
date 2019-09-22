import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, nodes, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class NBTPathGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        {
          begin: patterns.nbtPath.begin,
          end: patterns.newLine,
          beginCaptures: captures.nbtPath.begin,
          patterns: [
            {
              begin: context.appendExec(
                patterns.nbtPath.next
              ),
              end: patterns.newLine,
              beginCaptures: captures.nbtPath.next,
              patterns: context.groupPatterns
            },

            { include: nodes.nbtPath.content },

            { include: nodes.error.badSyntax }
          ]
        }
      ]
    };
  }
}
