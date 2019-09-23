import {
  CommandNode,
  CommandNodeContext,
  CommandNodeType
} from "./command-manifest";
import { ExtendedLanguageGrammar, GrammarNode } from "./language-grammar";
import { deepCopy } from "./utils";
import { nodes } from "./version-specific/constants";
import { getGrammarNodeGenerator } from "./version-specific/grammar-node-generators";
import {
  makeCommandNodeChildNames,
  makeGrammarGroupName,
  makeGrammarNodeName,
  makeCommandNodeChildRefs,
  makeCommandNodeRedirectRefs
} from "./version-specific/utils";

export function makeLiteralGrammarNode(
  context: CommandNodeContext
): GrammarNode {
  return {
    begin: context.appendExec(`(${context.name})`),
    end: "{{ln}}",
    beginCaptures: {
      1: { name: context.breadcrumb.length > 0 ? "#subcommand" : "#command" }
    },
    patterns: context.groupPatterns
  } as GrammarNode;
}

function printError(context: CommandNodeContext, message: string) {
  const nodePath = [...context.breadcrumb, context.name].join(".");
  console.warn(`[WARN] ${message} at node ${nodePath}`);
}

export function makeArgumentGrammarNode(
  context: CommandNodeContext
): GrammarNode {
  const nodeParserGenerator = getGrammarNodeGenerator(context.node);

  if (nodeParserGenerator) {
    return nodeParserGenerator.generate(context);
  }

  printError(context, `Unknown parser "${context.node.parser}"`);
  return {
    patterns: [{ include: nodes.error.unknownParser }]
  };
}

export function makeGrammarNode(context: CommandNodeContext): GrammarNode {
  if (context.node.type === CommandNodeType.LITERAL) {
    return makeLiteralGrammarNode(context);
  }

  if (context.node.type === CommandNodeType.ARGUMENT) {
    return makeArgumentGrammarNode(context);
  }

  printError(context, `Invalid node type "${context.node.type}"`);
  return {
    patterns: [{ include: nodes.error.invalidNode }]
  };
}

export function makeGrammarGroup(
  commandNode: CommandNode,
  breadcrumb: string[]
): GrammarNode {
  return {
    patterns: [
      // Attempt to match all child nodes first.
      ...makeCommandNodeChildRefs(commandNode, breadcrumb),

      // Then attempt to match any redirects.
      ...makeCommandNodeRedirectRefs(commandNode, breadcrumb),

      // Then attempt to consume remaining whitespace.
      // NOTE This should only ever be reached by executable nodes.
      { include: nodes.common.trailingWhitespace },

      // Otherwise we've got an error.
      { include: nodes.error.unmatchedChild }
    ]
  } as GrammarNode;
}

export function augmentNode(
  grammar: ExtendedLanguageGrammar,
  context: CommandNodeContext
) {
  const nextBreadcrumb = [...context.breadcrumb, context.name];
  const grammarNodeName = makeGrammarNodeName(...nextBreadcrumb);
  const grammarGroupName = makeGrammarGroupName(...nextBreadcrumb);

  // register a grammar pattern for the command node
  const grammarNode = makeGrammarNode(context);
  grammar.repository[grammarNodeName] = grammarNode;

  // register a grammar pattern with includes for all children command nodes
  // we do this separately to reduce nested patterns and to trivialize redirects
  const grammarGroup = makeGrammarGroup(context.node, nextBreadcrumb);
  grammar.repository[grammarGroupName] = grammarGroup;

  // recursively add children to the grammar
  makeCommandNodeChildNames(context.node).forEach(childName => {
    const childCommandNode = context.node.children[childName];
    const childContext = new CommandNodeContext(
      childCommandNode,
      childName,
      nextBreadcrumb
    );
    augmentNode(grammar, childContext);
  });
}

export function augmentGrammar(
  baseGrammar: ExtendedLanguageGrammar,
  commands: CommandNode
): ExtendedLanguageGrammar {
  // make a copy of the given grammar
  const grammar = deepCopy(baseGrammar) as ExtendedLanguageGrammar;

  // DELETEME limit generated commands during development
  commands = {
    type: CommandNodeType.ROOT,
    children: {
      data: commands.children["data"],
      effect: commands.children["effect"],
      execute: commands.children["execute"],
      function: commands.children["function"],
      say: commands.children["say"],
      tellraw: commands.children["tellraw"]
    }
  };

  // register grammar root group with includes for all top-level commands
  const grammarRootGroup = makeGrammarGroup(commands, []);
  grammar.repository["generated.commands"] = grammarRootGroup;

  // recursively add top-level commands to the grammar
  makeCommandNodeChildNames(commands).forEach(childName => {
    const childCommandNode = commands.children[childName];
    const childContext = new CommandNodeContext(
      childCommandNode,
      childName,
      []
    );
    augmentNode(grammar, childContext);
  });

  return grammar;
}
