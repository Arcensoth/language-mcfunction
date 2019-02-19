import { CommandNode } from "./command-manifest";
import { ExtendedLanguageGrammar, GrammarNode } from "./language-grammar";
import { deepCopy } from "./utils";

function augmentNode(
  grammar: ExtendedLanguageGrammar,
  grammarNode: GrammarNode,
  commandNode: CommandNode
) {
  // TODO add command sub-patterns to grammar
}

export function augmentGrammar(
  baseGrammar: ExtendedLanguageGrammar,
  commands: CommandNode
): ExtendedLanguageGrammar {
  const grammar = deepCopy(baseGrammar);
  const grammarNode = grammar.repository.generated_commands;
  const commandNode = commands;
  augmentNode(grammar, grammarNode, commandNode);
  return grammar;
}
