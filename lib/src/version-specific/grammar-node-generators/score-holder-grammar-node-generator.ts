import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";
import { EntityGrammarNodeGenerator } from "./entity-grammar-node-generator";

export class ScoreHolderGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // Similar to target selectors, but with "*" and fake-players.
    // TODO How do we reuse the existing singleton? #optimization
    const selectorGen = new EntityGrammarNodeGenerator();
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
