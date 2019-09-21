import { GrammarNodeGenerator } from "./grammar-node-generators/abc/grammar-node-generator";
import { EntityGrammarNodeGenerator } from "./grammar-node-generators/entity-grammar-node-generator";

const GRAMMAR_NODE_GENERATOR_MAP: {
  [parserID: string]: GrammarNodeGenerator;
} = {
  "minecraft:entity": new EntityGrammarNodeGenerator()
};

export function getGrammarNodeGenerator(parserID: string) {
  return GRAMMAR_NODE_GENERATOR_MAP[parserID];
}
