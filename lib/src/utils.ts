import fs = require("fs");
import path = require("path");
import plist = require("plist");
import yaml = require("js-yaml");
import bson = require("bson");

import { ExtendedLanguageGrammar, LanguageGrammar } from "./language-grammar";
import { augmentGrammar } from "./version-specific/utils";
import { VersionData } from "./version-specific/version-data";

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

const FORMAT_PROPERTIES = ["match", "begin", "end"];
const FORMAT_NAMES = ["name", "contentName"];
const CAPTURE_INCLUDES = ["captures", "beginCaptures", "endCaptures"];
const RECURSE_MAPS = ["captures", "beginCaptures", "endCaptures"];
const RECURSE_LISTS = ["patterns"];

function formatProperty(grammar: any, s: string): string {
  if (s.indexOf("{{") < 0) {
    return s;
  }
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
      `Grammar "${grammar.name}" -> capturesRespository has no item named "${name}"`
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
  CAPTURE_INCLUDES.forEach((key: string) => {
    if (key in node) {
      if (typeof node[key] === "string") {
        node[key] = getCaptures(grammar, node[key]);
      } else if (node[key] instanceof Array) {
        // merge dicts, let keys overlap in order
        const newCaptures: { [key: number]: any } = {};
        node[key].forEach((entry: any) => {
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
        node[key] = newCaptures;
      }
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
  const yamlData = yaml.safeDump(grammar);
  console.log(`Writing ${yamlData.length} bytes to: ${yamlPath}`);
  fs.writeFileSync(yamlPath, yamlData);

  // write json
  const jsonPath = path.join(outDir, `${outName}.tmLanguage.json`);
  const jsonData = JSON.stringify(grammar, null, 2);
  console.log(`Writing ${jsonData.length} bytes to: ${jsonPath}`);
  fs.writeFileSync(jsonPath, jsonData);

  // write plist
  const plistPath = path.join(outDir, `${outName}.tmLanguage`);
  const plistData = plist.build(grammar as {});
  console.log(`Writing ${plistData.length} bytes to: ${plistPath}`);
  fs.writeFileSync(plistPath, plistData);
}

export function buildVersionAgnosticGrammar() {
  console.log("Building version-agnostic grammar");

  const grammarPath = path.join(
    PROJECT_ROOT,
    "lib",
    "src",
    "grammars",
    "version-agnostic.yaml"
  );

  const extendedGrammar = yaml.safeLoad(fs.readFileSync(grammarPath, "utf8"));
  const compiledGrammar = compileExtendedGrammar(extendedGrammar);

  const outDir = PROJECT_ROOT;
  const outName = "mcfunction";

  writeGrammar(compiledGrammar, outDir, outName);

  console.log("Success!");
}

function assertDataPath(dataPath: string) {
  // error and exit if the supplied data path does not exist
  if (!fs.existsSync(dataPath)) {
    console.error(
      "[ERROR] Could not find generated data at:" + `\n  ${dataPath}`
    );
    process.exit();
  }
}

export function buildVersionSpecificGrammar(label: string) {
  console.log(`Building version-specific grammar '${label}'`);

  // read data
  const versionDataFilePath = path.join(
    PROJECT_ROOT,
    "data",
    `mcfunction-${label}.bson`
  );

  console.log(`Reading data from: ${versionDataFilePath}`);

  // error and exit if base file does not exist
  if (!fs.existsSync(versionDataFilePath)) {
    console.error(
      `[ERROR] You must first build data for version "${label}" at:` +
        `\n  ${versionDataFilePath}`
    );
    process.exit();
  }

  const versionData = VersionData.fromFile(versionDataFilePath);

  const commands = versionData.commands;
  const numCommands = Object.keys(commands).length;
  console.log(`Data "${versionData.label}" contains ${numCommands} commands`);

  // read base grammar
  const baseGrammarPath = path.join(
    PROJECT_ROOT,
    "lib",
    "src",
    "grammars",
    "version-specific-base.yaml"
  );

  const baseGrammar = yaml.safeLoad(fs.readFileSync(baseGrammarPath, "utf8"));
  baseGrammar.label = versionData.label;

  const augmentedGrammar = augmentGrammar(baseGrammar, commands);
  const compiledGrammar = compileExtendedGrammar(augmentedGrammar);

  const outDir = path.join(PROJECT_ROOT, "grammars");
  const outName = `mcfunction-${versionData.label}`;

  writeGrammar(compiledGrammar, outDir, outName);

  console.log("Success!");
}

export function buildVersionSpecificData(inPath: string, label: string) {
  const dataPath = path.resolve(inPath);

  console.log(`Building version-specific data "${label}" from: ${dataPath}`);

  assertDataPath(dataPath);

  // read commands
  const commandsPath = path.join(dataPath, "reports", "commands.json");
  console.log(`Reading commands from: ${commandsPath}`);
  const commands = JSON.parse(fs.readFileSync(commandsPath, "utf8"));
  const numCommands = Object.keys(commands.children).length;
  console.log(`Read ${numCommands} commands`);

  // read registries
  const registriesPath = path.join(dataPath, "reports", "registries.json");
  console.log(`Reading registries from: ${registriesPath}`);
  const registries = JSON.parse(fs.readFileSync(registriesPath, "utf8"));
  const numRegistries = Object.keys(registries).length;
  console.log(`Read ${numRegistries} registries`);

  // read base data
  const baseDataPath = path.join(
    PROJECT_ROOT,
    "lib",
    "src",
    "data",
    `mcfunction-${label}.yaml`
  );

  console.log(`Reading base data from: ${baseDataPath}`);

  // error and exit if base file does not exist
  if (!fs.existsSync(baseDataPath)) {
    console.error(
      "[ERROR] You must first create the base data for" +
        ` version "${label}" at:` +
        `\n  ${baseDataPath}`
    );
    process.exit();
  }

  const data = yaml.safeLoad(fs.readFileSync(baseDataPath, "utf8"));

  // populate loaded data
  data.commands = commands;
  data.registries = registries;

  // write bson
  const outDir = path.join(PROJECT_ROOT, "data");
  const outName = `mcfunction-${label}`;
  const serializedData = bson.serialize(data);
  const bsonPath = path.join(outDir, `${outName}.bson`);
  console.log(`Writing ${serializedData.byteLength} bytes to: ${bsonPath}`);
  fs.writeFileSync(bsonPath, serializedData);

  console.log("Success!");
}
