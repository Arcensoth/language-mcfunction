export interface RawCommandNodeChildren {
  [name: string]: RawCommandNode;
}

export interface RawCommandNode {
  type: string;
  parser?: string;
  properties?: {};
  executable?: boolean;
  children?: RawCommandNodeChildren;
}
