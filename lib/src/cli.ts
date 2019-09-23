import {
  buildVersionAgnosticGrammar,
  buildVersionSpecificData,
  buildVersionSpecificGrammar
} from "./utils";

const nargs = process.argv.length;

if (nargs < 3) {
  console.error(
    "[ERROR] You must provide a command:\n  build-grammar\n  build-data"
  );
  process.exit();
} else {
  const cmd = process.argv[2];

  // BUILD GRAMMAR
  if (cmd === "build-grammar") {
    // VERSION-AGNOSTIC
    if (nargs < 4) {
      // no data path; go version-agnostic
      buildVersionAgnosticGrammar();
    }

    // VERSION-SPECIFIC
    else {
      // data path provided; go version-specific
      buildVersionSpecificGrammar(process.argv[3]);
    }
  }

  // BUILD DATA
  else if (cmd === "build-data") {
    if (nargs < 5) {
      console.error(
        "[ERROR] You must provide a path to the generated data and a version" +
          " label to build version-specific data. For example:" +
          "\n  npm run cli build-data ./generated/ snapshot"
      );
      process.exit();
    } else {
      buildVersionSpecificData(process.argv[3], process.argv[4]);
    }
  }

  // ERROR: UNKNOWN COMMAND
  else {
    console.error(`[ERROR] Unknown command: ${cmd}`);
    process.exit();
  }
}
