import { CommandNode } from "../command-manifest";
import { GrammarNodeGenerator } from "./grammar-node-generators/abc/grammar-node-generator";
import { BoolGrammarNodeGenerator } from "./grammar-node-generators/bool-grammar-node-generator";
import { EntityGrammarNodeGenerator } from "./grammar-node-generators/entity-grammar-node-generator";
import { IntegerGrammarNodeGenerator } from "./grammar-node-generators/integer-grammar-node-generator";
import { MobEffectGrammarNodeGenerator } from "./grammar-node-generators/mob-effect-grammar-node-generator";

const GRAMMAR_NODE_GENERATOR_MAP: {
  [parserID: string]: GrammarNodeGenerator;
} = {
  "brigadier:bool": new BoolGrammarNodeGenerator(),
  "brigadier:integer": new IntegerGrammarNodeGenerator(),
  "minecraft:mob_effect": new MobEffectGrammarNodeGenerator(),
  "minecraft:entity": new EntityGrammarNodeGenerator()
};

export function getGrammarNodeGenerator(node: CommandNode) {
  return GRAMMAR_NODE_GENERATOR_MAP[node.parser];
}
