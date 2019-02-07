import fs = require("fs");
import path = require("path");
import yaml = require("js-yaml");

const FORMAT_PROPERTIES = ["name", "match", "begin", "end"];
const RECURSE_MAPS = ["captures", "beginCaptures", "endCaptures"];
const RECURSE_LISTS = ["patterns"];

function formatProperty(grammar: any, s: string): string {
  let s2 = s;
  for (const key in grammar.variables) {
    const value = grammar.variables[key];
    s2 = s2.replace("{{" + key + "}}", value);
  }
  return s2;
}

function updateNode(grammar: any, node: any) {
  // format properties (leaf-nodes) with variable expressions
  FORMAT_PROPERTIES.forEach((key: string) => {
    if (key in node) {
      node[key] = formatProperty(grammar, node[key]);
    }
  });

  // recurse into key-value children
  RECURSE_MAPS.forEach((key: string) => {
    if (key in node) {
      for (const child_key in node[key]) {
        updateNode(grammar, node[key][child_key]);
      }
    }
  });

  // recurse into list children
  RECURSE_LISTS.forEach((key: string) => {
    if (key in node) {
      node[key].forEach((pattern: any) => {
        updateNode(grammar, pattern);
      });
    }
  });
}

const grammar = yaml.safeLoad(
  fs.readFileSync("mcfunction.tmLanguage.yaml", "utf8")
);

// start by formatting variables themselves
for (const key in grammar.variables) {
  grammar.variables[key] = formatProperty(grammar, grammar.variables[key]);
}

// update root
updateNode(grammar, grammar);

// update repository
for (const key in grammar.repository) {
  updateNode(grammar, grammar.repository[key]);
}

fs.writeFileSync(
  "mcfunction.tmLanguage.json",
  JSON.stringify(grammar, null, 2)
);
