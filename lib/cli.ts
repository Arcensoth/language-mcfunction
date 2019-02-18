import fs = require("fs");
import path = require("path");
import yaml = require("js-yaml");

import { CommandManifest } from "./command-manifest";
import { compileExtendedGrammar, writeGrammar } from "./utils";
import { augmentGrammar } from "./version-specific";

function buildVersionSpecificGrammar(
  dataPath: string,
  baseGrammarPath: string,
  outDir: string,
  outName: string,
  label: string
) {
  const baseGrammar = yaml.safeLoad(fs.readFileSync(baseGrammarPath, "utf8"));
  baseGrammar.label = label;
  const commands = JSON.parse(
    fs.readFileSync(path.join(dataPath, "reports", "commands.json"), "utf8")
  ) as CommandManifest;
  const augmentedGrammar = augmentGrammar(baseGrammar, commands);
  const compiledGrammar = compileExtendedGrammar(augmentedGrammar);
  writeGrammar(compiledGrammar, outDir, outName);
}

function buildVersionAgnosticGrammar(
  grammarPath: string,
  outDir: string,
  outName: string
) {
  const extendedGrammar = yaml.safeLoad(fs.readFileSync(grammarPath, "utf8"));
  const compiledGrammar = compileExtendedGrammar(extendedGrammar);
  writeGrammar(compiledGrammar, outDir, outName);
}

const PROJECT_ROOT = path.resolve(__dirname, "..");

if (process.argv.length > 2) {
  // data path provided; go version-specific
  const dataPath = process.argv[2];
  const label = process.argv[3];
  console.log(`Building version-specific grammar '${label}' from:`, dataPath);
  buildVersionSpecificGrammar(
    path.resolve(dataPath),
    path.join(PROJECT_ROOT, "lib", "grammars", "version-specific-base.yaml"),
    path.join(PROJECT_ROOT, "grammars"),
    `mcfunction-${label}`,
    label
  );
} else {
  // no data path; go version-agnostic
  console.log("Building version-agnostic grammar");
  buildVersionAgnosticGrammar(
    path.join(PROJECT_ROOT, "lib", "grammars", "version-agnostic.yaml"),
    PROJECT_ROOT,
    "mcfunction"
  );
}
