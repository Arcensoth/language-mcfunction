import { RawCommandNode } from "./raw-command-node";

export enum CommandNodeType {
  ROOT = "root",
  LITERAL = "literal",
  ARGUMENT = "argument"
}

export interface CommandNodeChildren {
  [name: string]: CommandNode;
}

export interface CommandNode {
  type: CommandNodeType;
  parser?: string;
  properties?: {};
  executable?: boolean;
  children: CommandNodeChildren;

  // let's make this an actual reference
  redirect?: CommandNode;

  // add this for smoother iteration
  childList: CommandNode[];

  // add this for backtracking
  parent: CommandNode;

  // and these for flexibility
  name: string;
  breadcrumb: string[];
  id: string;
}

function augmentCommandNode(
  rootNode: RawCommandNode,
  parentNode: RawCommandNode,
  rawNode: RawCommandNode,
  breadcrumb: string[]
): void {
  const node: CommandNode = rawNode as CommandNode;

  node.children = node.children || {};

  node.parent = parentNode as CommandNode;
  node.name = breadcrumb[breadcrumb.length - 1];
  node.breadcrumb = breadcrumb;
  node.id = node.breadcrumb.join(".");

  node.childList = Object.values(node.children);

  // resolve redirect, if any
  if (node.redirect) {
    const redirects: string[] = ((node.redirect as unknown) as string[]).reverse();
    let redirect = rootNode;
    while (redirects.length > 0) {
      redirect = redirect.children[redirects.pop()];
    }
    node.redirect = redirect as CommandNode;
  }

  // implicit case for root redirects (such as `execute run`)
  else if (!node.executable && node.childList.length === 0) {
    node.redirect = rootNode as CommandNode;
  }

  // recurse into children
  Object.keys(node.children).forEach(childNodeName => {
    const childNode = node.children[childNodeName];
    const childBreadcrumb = [...node.breadcrumb, childNodeName];
    augmentCommandNode(rootNode, node, childNode, childBreadcrumb);
  });
}

export function makeCommandTree(rawRoot: RawCommandNode): CommandNode {
  augmentCommandNode(rawRoot, null, rawRoot, []);
  return rawRoot as CommandNode;
}
