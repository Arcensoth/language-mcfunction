import {
  CommandNode,
  CommandNodeType
} from "../../lib/src/version-specific/command-node";

export interface ExtendedCommandNodeChildren {
  [name: string]: ExtendedCommandNode;
}

export interface ExtendedCommandNode {
  type: CommandNodeType;
  parser?: string;
  properties?: {};
  executable?: boolean;
  children: ExtendedCommandNodeChildren;

  // let's make this an actual reference
  redirect?: ExtendedCommandNode;

  // add this for smoother iteration
  childList: ExtendedCommandNode[];

  // add this for backtracking
  parent: ExtendedCommandNode;

  // and these for flexibility
  name: string;
  breadcrumb: string[];
  id: string;
}

function augmentCommandNode(
  rootNode: CommandNode,
  parentNode: CommandNode,
  rawNode: CommandNode,
  breadcrumb: string[]
): void {
  const node: ExtendedCommandNode = (rawNode as any) as ExtendedCommandNode;

  node.children = node.children || {};

  node.parent = (parentNode as any) as ExtendedCommandNode;
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
    node.redirect = (redirect as any) as ExtendedCommandNode;
  }

  // implicit case for root redirects (such as `execute run`)
  else if (!node.executable && node.childList.length === 0) {
    node.redirect = (rootNode as any) as ExtendedCommandNode;
  }

  // recurse into children
  Object.keys(node.children).forEach(childNodeName => {
    const childNode = node.children[childNodeName];
    const childBreadcrumb = [...node.breadcrumb, childNodeName];
    augmentCommandNode(
      rootNode,
      node as any,
      childNode as any,
      childBreadcrumb
    );
  });
}

export function makeCommandTree(rawRoot: CommandNode): ExtendedCommandNode {
  augmentCommandNode(rawRoot, null, rawRoot, []);
  return (rawRoot as any) as ExtendedCommandNode;
}
