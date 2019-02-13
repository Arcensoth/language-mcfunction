# language-mcfunction
Language grammar and syntax highlighting for mcfunction files.

This is a generalized "context-free" grammar that does not target any particular version of Minecraft. As a result it may not be as accurate as version-specific grammars, however it will continue to work for all versions of the game.

## TODO
- [x] Comments
    - [x] Reminders: `TODO` / `FIXME` / etc
    - [x] Annotations: `@params` / `@returns` / etc
    - [x] Headings: `## Some Heading`
- [ ] Commands and arguments
    - [x] Literals (subcommands and more)
    - [x] Numbers: `20` / `3.14` / `.001`
    - [x] Ranges: `1..` / `3.14..20` / `...001`
    - [x] Relative coordinates: `~` / `~10` / `~-4.5`
    - [x] Local coordinates: `^` / `^-1` / `^.05`
    - [x] Resource locations: `minecraft:chests/simple_dungeon`
    - [x] Tagged resource locations: `#minecraft:wools` / `#mypack:hooks/run`
    - [ ] Block predicates: `minecraft:dispenser[facing=up]`
    - [x] Unquoted strings: `mypack.some.tag` / `mypack.custom_crafting_marker`
    - [x] Quoted strings: `"hello world"` / `"CustomName With Spaces"`
    - [ ] NBT compounds: `{ Fire: 20s , NoGravity: true, Tags: [ "mytag" ] }`
    - [ ] NBT paths: `SelectedItem.Count` / `RecordItem.tag.mycustomtag`
    - [x] UUIDs: `f7a39418-72ca-4bf2-bc7e-ba9df67a4707` `0-0-0-0-0`
    - [x] Fakeplayers: `#hidden` / `$fakefoo` / `%fakebar`
    - [x] Base selectors: `@e`
    - [x] Selectors with arguments: `@e[tag=foo]`
    - [ ] Selector arguments
        - [ ] Literal arguments: `gamemode` / `sort`
        - [ ] Numeric arguments: `x` / `y` / `z` / `limit`
        - [ ] Range arguments: `distance` / `level`
        - [ ] Resource location arguments: `type`
        - [ ] Tagged resource location arguments: `type`
        - [ ] Unquoted string arguments: `tag`
        - [ ] Quoted string arguments: `name`
        - [ ] NBT compound arguments: `nbt`
        - [ ] Score arguments: `scores`
        - [ ] Advancement arguments: `advancements`

## Resources
- https://github.com/github/linguist/blob/master/CONTRIBUTING.md
- https://github.com/github/linguist/blob/master/vendor/README.md
  - https://github.com/Microsoft/TypeScript-TmLanguage/blob/master/TypeScript.YAML-tmLanguage
- https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
- https://gist.github.com/Aerijo/b8c82d647db783187804e86fa0a604a1
- https://macromates.com/manual/en/language_grammars
- https://regex101.com/
