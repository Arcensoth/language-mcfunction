import {
  CommandNode,
  CommandNodeChildren,
  CommandNodeType
} from "./command-manifest";
import { ExtendedLanguageGrammar, GrammarNode } from "./language-grammar";
import { deepCopy } from "./utils";

export function getCommandNodeChildNames(commandNode: CommandNode): string[] {
  return Object.keys(commandNode.children ? commandNode.children : []);
}

export function getGrammarNodeName(...components: string[]): string {
  return "generated.command." + components.join(".");
}

export function getGrammarGroupName(...components: string[]): string {
  return "generated.commands." + components.join(".");
}

export function makeGrammarNode(
  commandNode: CommandNode,
  name: string,
  breadcrumb: string[]
): GrammarNode {
  // FIXME deal with node type and parser
  const grammarGroupName = getGrammarGroupName(...breadcrumb, name);
  return {
    begin: commandNode.executable
      ? `(${name}){{cbx_true}}`
      : `(${name}){{cbx_false}}`,
    end: "{{ln}}",
    beginCaptures: {
      1: { name: breadcrumb.length > 0 ? "#subcommand" : "#command" }
    },
    patterns: [{ include: `#${grammarGroupName}` }]
  } as GrammarNode;
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
  commandNode: CommandNode,
  name: string,
  breadcrumb: string[]
) {
  const nextBreadcrumb = [...breadcrumb, name];
  const grammarNodeName = getGrammarNodeName(...nextBreadcrumb);
  const grammarGroupName = getGrammarGroupName(...nextBreadcrumb);

  // register a grammar pattern for the command node
  const grammarNode = makeGrammarNode(commandNode, name, breadcrumb);
  grammar.repository[grammarNodeName] = grammarNode;

  // register a grammar pattern with includes for all children command nodes
  // we do this separately to reduce nested patterns and to trivialize redirects
  const grammarGroup = makeGrammarGroup(commandNode, nextBreadcrumb);
  grammar.repository[grammarGroupName] = grammarGroup;

  // recursively add children to the grammar
  getCommandNodeChildNames(commandNode).forEach(childName => {
    const childCommandNode = commandNode.children[childName];
    augmentNode(grammar, childCommandNode, childName, nextBreadcrumb);
  });
}

export function augmentGrammar(
  baseGrammar: ExtendedLanguageGrammar,
  commands: CommandNode
): ExtendedLanguageGrammar {
  // make a copy of the given grammar
  const grammar = deepCopy(baseGrammar) as ExtendedLanguageGrammar;

  // DELETE
  commands = {
    type: CommandNodeType.ROOT,
    children: {
      advancement: commands.children["advancement"]
    }
  };

  // register grammar root group with includes for all top-level commands
  const grammarRootGroup = makeGrammarGroup(commands, []);
  grammar.repository["generated.commands"] = grammarRootGroup;

  // DELETE
  grammarRootGroup.patterns = [
    { include: "#generated.command.say" },
    { include: "#generated.command.tellraw" },
    { include: "#generated.command.execute" },
    ...grammarRootGroup.patterns
  ];

  // recursively add top-level commands to the grammar
  getCommandNodeChildNames(commands).forEach(childName => {
    const childCommandNode = commands.children[childName];
    augmentNode(grammar, childCommandNode, childName, []);
  });

  return grammar;
}
