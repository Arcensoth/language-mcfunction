import { CommandNodeType } from "../../lib/src/version-specific/command-node";
import { ExtendedCommandNode } from "./extended-command-node";
import { LanguageData } from "./language-database";

export interface CommandParserState {
  // remaining text to be parsed
  commandText: string;

  // current node in the command tree
  commandNode: ExtendedCommandNode;

  // preserved history of the original literals and arguments, by name
  breadcrumb: string[];

  // whether to continue processing the command text
  continue: boolean;
}

export class CommandParserError extends Error {
  parserState: CommandParserState;

  constructor(parserState: CommandParserState, message: string) {
    // TODO stringify state into a human-readable format; e.g. command node help text
    super(`Error while parsing command "${parserState}": ${message}`);
    this.parserState = parserState;
  }
}

export class UnknownNodeTypeError extends CommandParserError {
  nodeType: string;

  constructor(parserState: CommandParserState, nodeType: string) {
    super(parserState, `Unknown node type "${nodeType}"`);
    this.nodeType = nodeType;
  }
}

export class CommandParser {
  // version data to match against the command text
  languageData: LanguageData;

  constructor(languageData: LanguageData) {
    this.languageData = languageData;
  }

  parseRoot(state: CommandParserState): CommandParserState {
    return this.parseLiteral(state);
  }

  parseLiteral(state: CommandParserState): CommandParserState {
    // pop a single word from the command text
    const splitIndex = state.commandText.search(/\s/);
    const literal = state.commandText.substring(0, splitIndex);
    const remainingCommand = state.commandText.substring(splitIndex + 1);

    // follow the child node corresponding to the literal
    const nextChild = state.commandNode.children[literal];

    if (nextChild) {
      return {
        commandText: remainingCommand,
        commandNode: nextChild,
        breadcrumb: [...state.breadcrumb, literal],
        continue: true
      };
    }

    return {
      commandText: state.commandText,
      commandNode: state.commandNode,
      breadcrumb: [...state.breadcrumb],
      continue: false
    };
  }

  parseArgument(state: CommandParserState): CommandParserState {
    // FIXME implement argument parsers
    return this.parseLiteral(state);
  }

  parse(commandText: string): CommandParserState {
    // create the initial state
    let state: CommandParserState = {
      commandText: commandText,
      commandNode: this.languageData.commands,
      breadcrumb: [],
      continue: true
    };

    // transform state repeatedly based on node type
    // until the command text cannot be further processed
    while (state.continue) {
      if (state.commandNode.type === CommandNodeType.ROOT) {
        state = this.parseRoot(state);
      } else if (state.commandNode.type === CommandNodeType.LITERAL) {
        state = this.parseLiteral(state);
      } else if (state.commandNode.type === CommandNodeType.ARGUMENT) {
        state = this.parseArgument(state);
      } else {
        throw new UnknownNodeTypeError(state, state.commandNode.type);
      }

      // follow redirects
      if (state.commandNode.redirect) {
        state = {
          commandText: state.commandText,
          commandNode: state.commandNode.redirect,
          breadcrumb: [
            ...state.breadcrumb,
            `(${state.commandNode.redirect.name})`
          ],
          continue: state.continue
        };
      }
    }

    // return the final state
    return state;
  }
}
