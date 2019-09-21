import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, nodes, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class TargetSelectorGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        // (1) selector without arguments
        {
          begin: context.appendExec(patterns.basicTargetSelector),
          end: patterns.newLine,
          beginCaptures: {
            1: { name: captures.targetSelector.base }
          },
          patterns: context.groupPatterns
        },

        // (2) uuid
        {
          begin: context.appendExec(patterns.UUID),
          end: patterns.newLine,
          beginCaptures: { 1: { name: captures.target.UUID } },
          patterns: context.groupPatterns
        },

        // (3) player name
        {
          begin: context.appendExec(patterns.playerName),
          end: patterns.newLine,
          beginCaptures: { 1: { name: captures.target.playerName } },
          patterns: context.groupPatterns
        },

        // (4) selector with arguments
        {
          begin: patterns.parameterizedTargetSelector.begin,
          end: patterns.newLine,
          beginCaptures: {
            1: { name: captures.targetSelector.base },
            2: { name: captures.targetSelector.bracket }
          },
          patterns: [
            {
              begin: context.appendExec(
                patterns.parameterizedTargetSelector.next
              ),
              end: patterns.newLine,
              beginCaptures: {
                1: { name: captures.targetSelector.bracket }
              },
              patterns: context.groupPatterns
            },

            { include: nodes.targetSelector.content },

            { include: nodes.error.badSyntax }
          ]
        }
      ]
    };
  }
}
