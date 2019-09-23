import { CommandNode } from "../command-manifest";
import { GrammarNodeGenerator } from "./grammar-node-generators/abc/grammar-node-generator";
import { BlockPositionGrammarNodeGenerator } from "./grammar-node-generators/block-position-grammar-node-generator";
import { BlockPredicateGrammarNodeGenerator } from "./grammar-node-generators/block-predicate-grammar-node-generator";
import { BoolGrammarNodeGenerator } from "./grammar-node-generators/bool-grammar-node-generator";
import { DimensionGrammarNodeGenerator } from "./grammar-node-generators/dimension-grammar-node-generator";
import { DoubleGrammarNodeGenerator } from "./grammar-node-generators/double-grammar-node-generator";
import { EntityAnchorGrammarNodeGenerator } from "./grammar-node-generators/entity-anchor-grammar-node-generator";
import { FunctionGrammarNodeGenerator } from "./grammar-node-generators/function-grammar-node-generator";
import { IntegerGrammarNodeGenerator } from "./grammar-node-generators/integer-grammar-node-generator";
import { MessageGrammarNodeGenerator } from "./grammar-node-generators/message-grammar-node-generator";
import { MobEffectGrammarNodeGenerator } from "./grammar-node-generators/mob-effect-grammar-node-generator";
import { NBTCompoundGrammarNodeGenerator } from "./grammar-node-generators/nbt-compound-grammar-node-generator";
import { NBTPathGrammarNodeGenerator } from "./grammar-node-generators/nbt-path-grammar-node-generator";
import { NBTValueGrammarNodeGenerator } from "./grammar-node-generators/nbt-value-grammar-node-generator";
import { PositionGrammarNodeGenerator } from "./grammar-node-generators/position-grammar-node-generator";
import { ResourceLocationGrammarNodeGenerator } from "./grammar-node-generators/resource-location-grammar-node-generator";
import { ScoreHolderGrammarNodeGenerator } from "./grammar-node-generators/score-holder-grammar-node-generator";
import { ScoreboardObjectiveGrammarNodeGenerator } from "./grammar-node-generators/scoreboard-objective-grammar-node-generator";
import { SwizzleGrammarNodeGenerator } from "./grammar-node-generators/swizzle-grammar-node-generator";
import { TargetSelectorGrammarNodeGenerator } from "./grammar-node-generators/target-selector-grammar-node-generator";
import { TextComponentGrammarNodeGenerator } from "./grammar-node-generators/text-component-grammar-node-generator";

export const GRAMMAR_NODE_GENERATOR_MAP: {
  [parserID: string]: GrammarNodeGenerator;
} = {
  "brigadier:bool": new BoolGrammarNodeGenerator(),
  "brigadier:double": new DoubleGrammarNodeGenerator(),
  "brigadier:integer": new IntegerGrammarNodeGenerator(),
  "minecraft:block_pos": new BlockPositionGrammarNodeGenerator(),
  "minecraft:block_predicate": new BlockPredicateGrammarNodeGenerator(),
  "minecraft:component": new TextComponentGrammarNodeGenerator(),
  "minecraft:dimension": new DimensionGrammarNodeGenerator(),
  "minecraft:entity": new TargetSelectorGrammarNodeGenerator(),
  "minecraft:entity_anchor": new EntityAnchorGrammarNodeGenerator(),
  "minecraft:function": new FunctionGrammarNodeGenerator(),
  "minecraft:message": new MessageGrammarNodeGenerator(),
  "minecraft:mob_effect": new MobEffectGrammarNodeGenerator(),
  "minecraft:nbt_compound_tag": new NBTCompoundGrammarNodeGenerator(),
  "minecraft:nbt_path": new NBTPathGrammarNodeGenerator(),
  "minecraft:nbt_tag": new NBTValueGrammarNodeGenerator(),
  "minecraft:objective": new ScoreboardObjectiveGrammarNodeGenerator(),
  "minecraft:resource_location": new ResourceLocationGrammarNodeGenerator(),
  "minecraft:score_holder": new ScoreHolderGrammarNodeGenerator(),
  "minecraft:swizzle": new SwizzleGrammarNodeGenerator(),
  "minecraft:vec3": new PositionGrammarNodeGenerator()
};

export function getGrammarNodeGenerator(node: CommandNode) {
  return GRAMMAR_NODE_GENERATOR_MAP[node.parser];
}
