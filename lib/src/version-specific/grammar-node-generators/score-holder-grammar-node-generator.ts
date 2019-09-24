import { GrammarNode } from "../../language-grammar";
import { CommandNodeContext } from "../command-node-context";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";
import { TargetSelectorGrammarNodeGenerator } from "./target-selector-grammar-node-generator";

export class ScoreHolderGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // Similar to target selectors, but with "*" and fake-players.
    // TODO How do we reuse the existing singleton? #optimization
    const selectorGen = new TargetSelectorGrammarNodeGenerator();
    const selectorNodes = selectorGen.generate(context);
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.scoreHolder.all),
          end: patterns.newLine,
          beginCaptures: captures.scoreHolder.all,
          patterns: context.groupPatterns
        },
        {
          begin: context.appendExec(patterns.scoreHolder.fakeplayer),
          end: patterns.newLine,
          beginCaptures: captures.scoreHolder.fakeplayer,
          patterns: context.groupPatterns
        },
        ...selectorNodes.patterns
      ]
    };
  }
}
