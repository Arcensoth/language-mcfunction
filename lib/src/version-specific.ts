import {
  CommandNode,
  CommandNodeChildren,
  CommandNodeType,
  CommandNodeContext
} from "./command-manifest";
import { ExtendedLanguageGrammar, GrammarNode } from "./language-grammar";
import { deepCopy } from "./utils";
import { getGrammarNodeGenerator } from "./version-specific/grammar-node-generators";

export const ERROR_PATTERNS = {
  patterns: [{ include: "#error.command_line" }]
};

export function getCommandNodeChildNames(commandNode: CommandNode): string[] {
  return Object.keys(commandNode.children ? commandNode.children : []);
}

export function getGrammarNodeName(...components: string[]): string {
  return "generated.command." + components.join(".");
}

export function getGrammarGroupName(...components: string[]): string {
  return "generated.commands." + components.join(".");
}

export function makeLiteralGrammarNode(
  context: CommandNodeContext
): GrammarNode {
  const grammarGroupName = getGrammarGroupName(
    ...context.breadcrumb,
    context.name
  );
  return {
    begin: context.node.executable
      ? `(${context.name}){{cbx_true}}`
      : `(${context.name}){{cbx_false}}`,
    end: "{{ln}}",
    beginCaptures: {
      1: { name: context.breadcrumb.length > 0 ? "#subcommand" : "#command" }
    },
    patterns: [{ include: `#${grammarGroupName}` }]
  } as GrammarNode;
}

function printError(context: CommandNodeContext, message: string) {
  const nodePath = [...context.breadcrumb, context.name].join(".");
  console.error(`${message} at node ${nodePath}`);
}

export function makeArgumentGrammarNode(
  context: CommandNodeContext
): GrammarNode {
  const nodeParserGenerator = getGrammarNodeGenerator(context.node.parser);

  if (nodeParserGenerator) {
    return nodeParserGenerator.generate(context);
  }

  printError(context, `Unknown parser "${context.node.parser}"`);
  return ERROR_PATTERNS;
}

export function makeGrammarNode(context: CommandNodeContext): GrammarNode {
  if (context.node.type === CommandNodeType.LITERAL) {
    return makeLiteralGrammarNode(context);
  }

  if (context.node.type === CommandNodeType.ARGUMENT) {
    return makeArgumentGrammarNode(context);
  }

  printError(context, `Invalid node type "${context.node.type}"`);
  return ERROR_PATTERNS;
}

export function makeGrammarGroup(
  commandNode: CommandNode,
  breadcrumb: string[]
): GrammarNode {
  return {
    patterns: [
      ...getCommandNodeChildNames(commandNode).map(childName => {
        const childGrammarNodeName = getGrammarNodeName(
          ...breadcrumb,
          childName
        );
        return { include: `#${childGrammarNodeName}` } as GrammarNode;
      }),
      { include: "#error.command_line" }
    ]
  } as GrammarNode;
}

export function augmentNode(
  grammar: ExtendedLanguageGrammar,
  context: CommandNodeContext
) {
  const nextBreadcrumb = [...context.breadcrumb, context.name];
  const grammarNodeName = getGrammarNodeName(...nextBreadcrumb);
  const grammarGroupName = getGrammarGroupName(...nextBreadcrumb);

  // register a grammar pattern for the command node
  const grammarNode = makeGrammarNode(context);
  grammar.repository[grammarNodeName] = grammarNode;

  // register a grammar pattern with includes for all children command nodes
  // we do this separately to reduce nested patterns and to trivialize redirects
  const grammarGroup = makeGrammarGroup(context.node, nextBreadcrumb);
  grammar.repository[grammarGroupName] = grammarGroup;

  // recursively add children to the grammar
  getCommandNodeChildNames(context.node).forEach(childName => {
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

  // DELETEME
  commands = {
    type: CommandNodeType.ROOT,
    children: {
      effect: commands.children["effect"]
    }
  };

  // register grammar root group with includes for all top-level commands
  const grammarRootGroup = makeGrammarGroup(commands, []);
  grammar.repository["generated.commands"] = grammarRootGroup;

  // DELETEME
  grammarRootGroup.patterns = [
    { include: "#generated.command.say" },
    { include: "#generated.command.tellraw" },
    { include: "#generated.command.execute" },
    ...grammarRootGroup.patterns
  ];

  // recursively add top-level commands to the grammar
  getCommandNodeChildNames(commands).forEach(childName => {
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
