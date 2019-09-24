import fs = require("fs");
import bson = require("bson");

import { CommandNode } from "./command-node";
import { ResourceRegistries } from "./resource-registries";

export class VersionData {
  constructor(
    public label: string,
    public commands: CommandNode,
    public registries: ResourceRegistries
  ) {}

  static fromFile(filePath: string): VersionData {
    const data = bson.deserialize(fs.readFileSync(filePath));
    return new VersionData(data.label, data.commands, data.registries);
  }
}
