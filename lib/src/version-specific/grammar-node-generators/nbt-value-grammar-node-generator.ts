import { CommandNodeContext } from "../../command-manifest";
import { GrammarNode } from "../../language-grammar";
import { captures, nodes, patterns } from "../constants";
import { GrammarNodeGenerator } from "./abc/grammar-node-generator";

export class NBTValueGrammarNodeGenerator extends GrammarNodeGenerator {
  generate(context: CommandNodeContext): GrammarNode {
    return {
      patterns: [
        // boolean
        {
          begin: context.appendExec(patterns.boolean),
          end: patterns.newLine,
          beginCaptures: captures.boolean,
          patterns: context.groupPatterns
        },

        // FIXME remaining nbt values (number, string, etc)

        // number (with possible suffix)
        // {
        //   begin: context.appendExec(patterns.number),
        //   end: patterns.newLine,
        //   beginCaptures: captures.number,
        //   patterns: context.groupPatterns
        // },

        // unquoted string
        // {
        //   begin: context.appendExec(patterns.unquotedString),
        //   end: patterns.newLine,
        //   beginCaptures: captures.unquotedString,
        //   patterns: context.groupPatterns
        // },

        // quoted string
        // {
        //   begin: context.appendExec(patterns.quotedString),
        //   end: patterns.newLine,
        //   beginCaptures: captures.quotedString,
        //   patterns: context.groupPatterns
        // },

        // compound
        {
          begin: patterns.nbtCompound.begin,
          end: patterns.newLine,
          beginCaptures: captures.nbtCompound.begin,
          patterns: [
            {
              begin: context.appendExec(
                patterns.nbtCompound.next
              ),
              end: patterns.newLine,
              beginCaptures: captures.nbtCompound.next,
              patterns: context.groupPatterns
            },

            { include: nodes.nbtCompound.content },

            { include: nodes.error.badSyntax }
          ]
        },

        // list
        {
          begin: patterns.nbtList.begin,
          end: patterns.newLine,
          beginCaptures: captures.nbtList.begin,
          patterns: [
            {
              begin: context.appendExec(
                patterns.nbtList.next
              ),
              end: patterns.newLine,
              beginCaptures: captures.nbtList.next,
              patterns: context.groupPatterns
            },

            { include: nodes.nbtList.content },

            { include: nodes.error.badSyntax }
          ]
        }
      ]
    };
  }
}
