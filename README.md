# language-mcfunction
Language grammar and syntax highlighting for mcfunction files.

[![Showcase](https://i.imgur.com/3mpF4an.png)](https://i.imgur.com/3mpF4an.png)

This is a generic "context-free" grammar that does not target any particular version of Minecraft. As a result it may not be as accurate as version-specific grammars, however it will continue to work for multiple versions of the game.

## Install
- VSCode: https://marketplace.visualstudio.com/items?itemName=arcensoth.language-mcfunction
- SublimeText: clone repository into user packages (e.g. `%appdata%\Sublime Text 3\Packages`)

## Configure
### Version-agnostic grammar
The version-agnostic `mcfunction` language should be active by default. It provides a decent fallback for otherwise unsupported versions of Minecraft. In order to do this, it must not assume any particular version. Because it cannot assume a version, it cannot provide context-sensitive highlighting. It is recommended that you use one of the [version-specific grammars](version-specific-grammars) if possible.

### Version-specific grammars
The version-specific grammars are partially generated based on Minecraft's generated data, which is available for Minecraft versions 1.13 and higher.

#### VSCode
You can easily choose which version of mcfunction to use by changing the `.mcfunction` extension association in your workspace settings:
```
"files.associations": {
  "*.mcfunction": "mcfunction-snapshot"
}
```
This option can also be set on the user-level in `settings.json` or folder-level in `.vscode/settings.json`.

## Features
Here's an [album](https://imgur.com/a/a8LvRjK) with everything below.

- Comments
    - [x] [Reminders](https://i.imgur.com/xfiPy7D.png): `TODO` / `FIXME` / etc
    - [x] [Annotations](https://i.imgur.com/yZgaGSN.png): `@params` / `@returns` / etc
    - [x] [Headings](https://i.imgur.com/jZvd5nO.png): `## Some Heading`
- Commands and arguments
    - [x] [Indentation](https://i.imgur.com/6bRd6Dd.png)
    - [x] [Booleans](https://i.imgur.com/FBKTc5u.png): `true` / `false`
    - [x] [Numbers](https://i.imgur.com/KSvbapt.png): `20` / `3.14` / `.001`
    - [x] [Operations](https://i.imgur.com/iYvND6j.png): `=` / `/=` / `%=` / etc
    - [x] [Ranges](https://i.imgur.com/ZUicjD0.png): `1..` / `3.14..20` / `...001`
    - [x] [Relative coordinates](https://i.imgur.com/3qaVlrO.png): `~` / `~10` / `~-4.5`
    - [x] [Local coordinates](https://i.imgur.com/9De4utY.png): `^` / `^-1` / `^.05`
    - [x] [Resource locations](https://i.imgur.com/wDWTzSw.png): `minecraft:chests/simple_dungeon` / `#minecraft:wools`
    - [x] [Block predicates](https://i.imgur.com/7QpQsi6.png): `minecraft:dispenser[facing=up]`
    - [x] [Unquoted strings](https://i.imgur.com/82vSj6Q.png): `mypack.some.tag` / `mypack.custom_crafting_marker`
    - [x] [Quoted strings with escaping](https://i.imgur.com/3Ns8MzH.png): `"hello world"` / `"CustomName With Spaces"`
    - [x] [NBT compounds/lists](https://i.imgur.com/ISjyX3Z.png): `{ Fire: 20s , NoGravity: true, Tags: [ "mytag" ] }`
    - [x] [NBT paths](https://i.imgur.com/DVPvepj.png): `SelectedItem.Count` / `RecordItem.tag.mycustomtag`
    - [x] [JSON/text components](https://i.imgur.com/5cJVdhc.png): `{"text": "hello world", "color": "blue"}`
    - [x] [UUIDs](https://i.imgur.com/uvwKnCC.png): `f7a39418-72ca-4bf2-bc7e-ba9df67a4707` `0-0-0-0-0`
    - [x] [Fakeplayers](https://i.imgur.com/jNODt4g.png): `#hidden` / `$fakefoo` / `%fakebar`
    - [x] [Base selectors](https://i.imgur.com/6eWmGa4.png): `@e`
    - [x] [Selectors with arguments](https://i.imgur.com/Ut4W6pF.png): `@e[tag=foo]` / `@e[tag=!foo]`
    - Selector arguments
        - [x] [Literal arguments](https://i.imgur.com/LtMfOGW.png): `gamemode` / `sort`
        - [x] [Numeric arguments](https://i.imgur.com/FvnxwYD.png): `x` / `y` / `z` / `limit`
        - [x] [Range arguments](https://i.imgur.com/DiLdNU6.png): `distance` / `level`
        - [x] [Resource location arguments](https://i.imgur.com/ZQ920Yw.png): `type`
        - [x] [Unquoted string arguments](https://i.imgur.com/svqzc2o.png): `tag`
        - [x] [Quoted string arguments](https://i.imgur.com/ahm8HYb.png): `name`
        - [x] [NBT compound arguments](https://i.imgur.com/JqWrpVm.png): `nbt`
        - [x] [Score arguments](https://i.imgur.com/L7f9wJ3.png): `scores`
        - [x] [Advancement arguments](https://i.imgur.com/yQj5Oye.png): `advancements`

## Customization
Scopes have been assigned with user customization in mind. If your editor allows scope overrides, this will make it easy to customize your own colours for a variety of scopes.

### Customizing errors
Short name  | Full scope name                           | Examples
----------- | ----------------------------------------- | ----------
`invalid`   | `invalid.illegal._.invalid.mcfunction`    | `execute (foo)`
`underline` | `markup.underline._.underline.mcfunction` | `execute (foo)`

### Customizing comments
Short name                | Full scope name                                       | Examples
------------------------- | ----------------------------------------------------- | ----------
`comment`                 | `comment._.comment.mcfunction`                        | `# This is a comment`
`comment.heading`         | `markup.heading._.heading.comment.mcfunction`         | `## Comment Heading`
`comment.marker.name`     | `markup.bold._.name.marker.comment.mcfunction`        | `# (TODO): optimize selectors`
`comment.marker.text`     | `comment._.text.marker.comment.mcfunction`            | `# TODO(: optimize selectors)`
`comment.annotation.name` | `markup.heading._.name.annotation.comment.mcfunction` | `# (@returns) the number of blocks`
`comment.annotation.text` | `comment._.text.annotation.comment.mcfunction`        | `# @returns( the number of blocks)`

### Customizing commands
Short name    | Full scope name                         | Examples
------------- | --------------------------------------- | ----------
`command`     | `keyword.control._.command.mcfunction`  | `(execute) as @a run (function)`
`subcommand`  | `keyword.other._.subcommand.mcfunction` | `execute (as) @a (run) function`

### Customizing selectors
Short name                | Full scope name                                               | Examples
------------------------- | ------------------------------------------------------------- | ----------
`entity_selector.base`    | `support.class._.base.entity_selector.mcfunction`             | `@a`
`entity_selector.bracket` | `support.class._.bracket.entity_selector.mcfunction`          | `[]`
`entity_selector.equals`  | `support.class._.equals.entity_selector.mcfunction`           | `=`
`entity_selector.comma`   | `support.class._.comma.entity_selector.mcfunction`            | `,`
`entity_selector.not`     | `constant.character.escape._.not.entity_selector.mcfunction`  | `!`
`entity_selector.param`   | `keyword.other._.param.entity_selector.mcfunction`            | `tag` / `type`

### Customizing NBT
Short name              | Full scope name                             | Examples
----------------------- | ------------------------------------------- | ----------
`nbt.compound_bracket`  | `storage._.compound_bracket.nbt.mcfunction` | `{}`
`nbt.list_bracket`      | `storage._.list_bracket.nbt.mcfunction`     | `[]`

### Other customizable scopes
Short name            | Full scope name                                   | Examples
--------------------- | ------------------------------------------------- | ----------
`target.uuid`         | `support.class._.uuid.target.mcfunction`          | `f7a39418-72ca-4bf2-bc7e-ba9df67a4707` / `0-0-0-0-0`
`target.player_name`  | `support.class._.uuid.target.mcfunction`          | `Arcensoth` / `some_guy`
`word`                | `string._.word.mcfunction`                        | `foo` / `foo_bar`
`keyword`             | `keyword._.word.mcfunction`                       | `nearest` / `creative`
`numeric_constant`    | `constant.numeric._.numeric_constant.mcfunction`  | `0` / `123` / `-99` / `001`

## Resources
- https://github.com/Arcensoth/language-tmdemo
- https://github.com/github/linguist/blob/master/CONTRIBUTING.md
- https://github.com/github/linguist/blob/master/vendor/README.md
  - https://github.com/Microsoft/TypeScript-TmLanguage/blob/master/TypeScript.YAML-tmLanguage
- https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
- https://gist.github.com/Aerijo/b8c82d647db783187804e86fa0a604a1
- https://macromates.com/manual/en/language_grammars
- https://regex101.com/
