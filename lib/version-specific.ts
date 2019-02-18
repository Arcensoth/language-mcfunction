import { CommandNode } from "./command-manifest";
import { ExtendedLanguageGrammar } from "./language-grammar";
import { deepCopy } from "./utils";

export function augmentGrammar(
  baseGrammar: ExtendedLanguageGrammar,
  commands: CommandNode
): ExtendedLanguageGrammar {
  const grammar = deepCopy(baseGrammar);

  // TODO add command sub-patterns to grammar

  return grammar;
}
