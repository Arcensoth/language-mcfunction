import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class IntegerGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    let pattern = patterns.integer;
    let capture = captures.integer;

    const propMin = context.node.properties
      ? context.node.properties["min"]
      : null;

    if (propMin === 0) {
      pattern = patterns.nonNegativeInteger;
      capture = captures.nonNegativeInteger;
    } else if (propMin > 0) {
      pattern = patterns.positiveInteger;
      capture = captures.positiveInteger;
    }

    return {
      patterns: [
        {
          begin: context.appendExec(pattern),
          end: patterns.newLine,
          beginCaptures: capture,
          patterns: context.groupPatterns
        }
      ]
    };
  }
}
