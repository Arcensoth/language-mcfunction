import fs = require("fs");
import path = require("path");
import yaml = require("js-yaml");

const FORMAT_PROPERTIES = ["match", "begin", "end"];

function formatProperty(grammar: any, s: string): string {
  let s2 = s;
  for (const key in grammar.variables) {
    const value = grammar.variables[key];
    s2 = s2.replace("{{" + key + "}}", value);
  }
  return s2;
}

function updateNode(grammar: any, node: any) {
  // format properties with variable expressions
  FORMAT_PROPERTIES.forEach((key: string) => {
    if (key in node) {
      node[key] = formatProperty(grammar, node[key]);
    }
  });

  // recurse into captures
  if ("captures" in node) {
    for (const key in node.captures) {
      updateNode(grammar, node.captures[key]);
    }
  }

  // recurse into patterns
  if ("patterns" in node) {
    node.patterns.forEach((pattern: any) => {
      updateNode(grammar, pattern);
    });
  }
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
