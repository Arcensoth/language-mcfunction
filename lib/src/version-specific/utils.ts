import { CommandNode } from "../command-manifest";
import { GrammarNode } from "../language-grammar";

export function makeGrammarNodeName(...components: string[]): string {
  return ["generated.command", ...components].join(".");
}

export function makeGrammarGroupName(...components: string[]): string {
  return ["generated.commands", ...components].join(".");
}

export function makeCommandNodeChildNames(node: CommandNode): string[] {
  return Object.keys(node.children ? node.children : []);
}

export function makeCommandNodeChildRefs(
  node: CommandNode,
  breadcrumb: string[]
): GrammarNode[] {
  const childNames = makeCommandNodeChildNames(node);
  return childNames.map(name => {
    // make sure to build a breadcrumb reference all the way to the child
    const ref = makeGrammarNodeName(...breadcrumb, name);
    return { include: `#${ref}` } as GrammarNode;
  });
}

export function makeCommandNodeRedirectRefs(
  node: CommandNode,
  breadcrumb: string[]
): GrammarNode[] {
  // If the node has redirects, use those directly.
  if (node.redirect) {
    return node.redirect.map(name => {
      // redirects work relative to the root node
      const ref = makeGrammarGroupName(name);
      return { include: `#${ref}` } as GrammarNode;
    });
  }

  // NOTE Watch out for implicit root redirects.
  // If a node is not executable and has neither children nor redirects, then it
  // must implicitly redirect to the root node. Currently the only command known
  // to do this is `execute run`.
  if (!(node.executable || node.children)) {
    const ref = makeGrammarGroupName();
    return [{ include: `#${ref}` } as GrammarNode];
  }

  // Otherwise, just return an empty list.
  return [];
}
