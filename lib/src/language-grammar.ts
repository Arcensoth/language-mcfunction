export interface GrammarCaptures {
  [group: number]: GrammarNode;
}

export interface GrammarNode {
  include?: string;
  name?: string;
  match?: string;
  begin?: string;
  end?: string;
  captures?: GrammarCaptures | string;
  beginCaptures?: GrammarCaptures | string;
  endCaptures?: GrammarCaptures | string;
  patterns?: GrammarNode[];
}

export interface LanguageGrammar {
  name: string;
  scopeName: string;
  fileTypes: string[];
  patterns: GrammarNode[];
  repository?: { [name: string]: GrammarNode };
  injectionSelector?: string;
}

export interface ExtendedLanguageGrammar extends LanguageGrammar {
  label: string;
  names: { [name: string]: string };
  variables: { [name: string]: string };
  capturesRepository: { [name: string]: GrammarCaptures };
}
