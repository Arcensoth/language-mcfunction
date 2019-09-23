import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class ResourceIDGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    // A resource ID is basically a resource location without any slashes.
    return {
      patterns: [
        {
          begin: context.appendExec(patterns.resourceID),
          end: patterns.newLine,
          beginCaptures: captures.resourceID,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
