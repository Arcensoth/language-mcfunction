import { GrammarNode } from "../../../language-grammar";
import { CommandNodeContext } from "../../command-node-context";

export abstract class GrammarNodeGenerator {
  abstract generate(context: CommandNodeContext): GrammarNode;
}
