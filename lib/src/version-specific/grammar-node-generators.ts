import { CommandNode } from "../command-manifest";
import { GrammarNodeGenerator } from "./grammar-node-generators/abc/grammar-node-generator";
import { BoolGrammarNodeGenerator } from "./grammar-node-generators/bool-grammar-node-generator";
import { DoubleGrammarNodeGenerator } from "./grammar-node-generators/double-grammar-node-generator";
import { EntityGrammarNodeGenerator } from "./grammar-node-generators/entity-grammar-node-generator";
import { IntegerGrammarNodeGenerator } from "./grammar-node-generators/integer-grammar-node-generator";
import { MessageGrammarNodeGenerator } from "./grammar-node-generators/message-grammar-node-generator";
import { MobEffectGrammarNodeGenerator } from "./grammar-node-generators/mob-effect-grammar-node-generator";
import { ScoreboardObjectiveGrammarNodeGenerator } from "./grammar-node-generators/scoreboard-objective-grammar-node-generator";
import { TextComponentGrammarNodeGenerator } from "./grammar-node-generators/text-component-grammar-node-generator";

const GRAMMAR_NODE_GENERATOR_MAP: {
  [parserID: string]: GrammarNodeGenerator;
} = {
  "brigadier:bool": new BoolGrammarNodeGenerator(),
  "brigadier:double": new DoubleGrammarNodeGenerator(),
  "brigadier:integer": new IntegerGrammarNodeGenerator(),
  "minecraft:component": new TextComponentGrammarNodeGenerator(),
  "minecraft:entity": new EntityGrammarNodeGenerator(),
  "minecraft:message": new MessageGrammarNodeGenerator(),
  "minecraft:mob_effect": new MobEffectGrammarNodeGenerator(),
  "minecraft:objective": new ScoreboardObjectiveGrammarNodeGenerator()
};

export function getGrammarNodeGenerator(node: CommandNode) {
  return GRAMMAR_NODE_GENERATOR_MAP[node.parser];
}
