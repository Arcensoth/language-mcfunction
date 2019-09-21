export const patterns = {
  newLine: "{{ln}}",
  boolean: "{{boolean}}",
  integer: "{{integer}}",
  nonNegativeInteger: "{{non_negative_integer}}",
  positiveInteger: "{{positive_integer}}",
  resourceID: "{{resource_id}}",
  UUID: "{{uuid}}",
  playerName: "{{player_name}}",
  basicTargetSelector: "{{basic_target_selector}}",
  parameterizedTargetSelector: {
    begin: "{{parameterized_target_selector.begin}}",
    next: "{{parameterized_target_selector.next}}"
  }
};

export const captures = {
  boolean: "#boolean",
  integer: "#integer",
  nonNegativeInteger: "#non_negative_integer",
  positiveInteger: "#positive_integer",
  resourceID: "#resource_id",
  targetSelector: {
    base: "#target_selector.base",
    bracket: "#target_selector.bracket"
  },
  target: {
    UUID: "#target.uuid",
    playerName: "#target.player_name"
  }
};

export const nodes = {
  error: {
    invalidNode: "#error.invalid_node",
    unknownParser: "#error.unknown_parser",
    unmatchedChild: "#error.unmatched_child",
    badSyntax: "#error.bad_syntax"
  },
  common: {
    trailingWhitespace: "#common.trailing_whitespace",
    message: "#common.message"
  },
  textComponent: '#text_component',
  targetSelector: {
    content: "#target_selector.content"
  }
};
