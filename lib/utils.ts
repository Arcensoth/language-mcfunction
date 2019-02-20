import fs = require("fs");
import path = require("path");
import plist = require("plist");
import yaml = require("js-yaml");

import { ExtendedLanguageGrammar, LanguageGrammar } from "./language-grammar";

const FORMAT_PROPERTIES = ["match", "begin", "end"];
const FORMAT_NAMES = ["name", "contentName"];
const RECURSE_MAPS = ["captures", "beginCaptures", "endCaptures"];
const RECURSE_LISTS = ["patterns"];

function formatProperty(grammar: any, s: string): string {
  let s2 = s;
  for (const key in grammar.variables) {
    const value = grammar.variables[key];
    if (!value) {
      throw Error(
        `Grammar "${grammar.name}" -> variables has no item named "${key}"`
      );
    }
    s2 = s2.replace(new RegExp("{{" + key + "}}", "g"), value);
  }
  return s2;
}

function formatName(grammar: any, name: string): string {
  if (name.indexOf("#") < 0) {
    return name;
  }
  const result = grammar.names[name.substring(1)];
  if (!result) {
    throw Error(
      `Grammar "${grammar.name}" -> names has no item named "${name}"`
    );
  }
  return result;
}

function getCaptures(grammar: any, name: string): any {
  const result = grammar.capturesRepository[name.substring(1)];
  if (!result) {
    throw Error(
      `Grammar "${
        grammar.name
      }" -> capturesRespository has no item named "${name}"`
    );
  }
  return result;
}

function updateNode(grammar: any, node: any) {
  // format properties (leaf-nodes) with variable expressions
  FORMAT_PROPERTIES.forEach((key: string) => {
    if (key in node) {
      node[key] = formatProperty(grammar, node[key]);
    }
  });

  // format names (leaf-nodes) with name definitions
  FORMAT_NAMES.forEach((key: string) => {
    if (key in node) {
      node[key] = formatName(grammar, node[key]);
    }
  });

  // process capture-includes
  if ("captures" in node) {
    if (typeof node.captures === "string") {
      node.captures = getCaptures(grammar, node.captures);
    } else if (node.captures instanceof Array) {
      // merge dicts, let keys overlap in order
      const newCaptures: { [key: number]: any } = {};
      node.captures.forEach((entry: any) => {
        const includeName = entry.include;
        const includeValue: { [key: number]: any } = getCaptures(
          grammar,
          includeName
        );
        for (const groupKey in includeValue) {
          const groupValue = includeValue[groupKey];
          newCaptures[groupKey] = groupValue;
        }
      });
      node.captures = newCaptures;
    }
  }

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

export function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function compileExtendedGrammar(
  extendedGrammar: ExtendedLanguageGrammar
): LanguageGrammar {
  const grammar = deepCopy(extendedGrammar);

  // append label, if any, to grammar name and scopeName
  if ("label" in grammar) {
    grammar.name = `${grammar.name}-${grammar.label}`;
    grammar.scopeName = `${grammar.scopeName}-${grammar.label}`;
  }

  // start by formatting variables themselves
  for (const key in grammar.variables) {
    grammar.variables[key] = formatProperty(grammar, grammar.variables[key]);
  }

  // as well as names
  for (const key in grammar.names) {
    grammar.names[key] = formatName(grammar, grammar.names[key]);
  }

  // update root
  updateNode(grammar, grammar);

  // update repository
  for (const key in grammar.repository) {
    updateNode(grammar, grammar.repository[key]);
  }

  // remove excess nodes
  delete grammar.label;
  delete grammar.names;
  delete grammar.variables;
  delete grammar.capturesRepository;

  return grammar;
}

export function writeGrammar(
  grammar: LanguageGrammar,
  outDir: string,
  outName: string
) {
  // write yaml
  const yamlPath = path.join(outDir, `${outName}.tmLanguage.yaml`);
  console.log("Writing:", yamlPath);
  fs.writeFileSync(yamlPath, yaml.safeDump(grammar));

  // write json
  const jsonPath = path.join(outDir, `${outName}.tmLanguage.json`);
  console.log("Writing:", jsonPath);
  fs.writeFileSync(jsonPath, JSON.stringify(grammar, null, 2));

  // write plist
  const plistPath = path.join(outDir, `${outName}.tmLanguage`);
  console.log("Writing:", plistPath);
  fs.writeFileSync(plistPath, plist.build(grammar as {}));
}
