# See: https://github.com/skylinerw/guides/blob/master/java/text%20component.md

# "text" and escaping
tellraw @s {"text": "hello world"}
tellraw @s {"text": "hello \"escaped\" world"}
tellraw @s {"text": "hello \" world"}
tellraw @s {"text": "hello ' world"}
tellraw @s {"text": "hello\nworld"}
tellraw @s {"text": true}
tellraw @s {"text": 123}
tellraw @s {"text": -321}
tellraw @s {"text": 3.14}

# "bold", "italic", "underline", and "obfuscated"
tellraw @s {"bold": false}
tellraw @s {"text": "this is bold", "bold": true}
tellraw @s {"italic": false}
tellraw @s {"text": "this is italic", "italic": true}
tellraw @s {"underlined": false}
tellraw @s {"text": "this is underlined", "underlined": true}
tellraw @s {"strikethrough": false}
tellraw @s {"text": "this is strikethrough", "strikethrough": true}
tellraw @s {"obfuscated": false}
tellraw @s {"text": "this is obfuscated", "obfuscated": true}

# "color"
tellraw @s {"color": "black"}
tellraw @s {"color": "dark_blue"}
tellraw @s {"color": "dark_green"}
tellraw @s {"color": "dark_aqua"}
tellraw @s {"color": "dark_red"}
tellraw @s {"color": "dark_purple"}
tellraw @s {"color": "gold"}
tellraw @s {"color": "gray"}
tellraw @s {"color": "dark_gray"}
tellraw @s {"color": "blue"}
tellraw @s {"color": "green"}
tellraw @s {"color": "aqua"}
tellraw @s {"color": "red"}
tellraw @s {"color": "light_purple"}
tellraw @s {"color": "yellow"}
tellraw @s {"color": "white"}

# "extra"
tellraw @s {"extra": []}
tellraw @s {"extra": ["hello"]}
tellraw @s {"extra": ["hello", "world"]}
tellraw @s {"extra": [{"text": "hello world"}]}
tellraw @s {"extra": [{"text": "hello \" world"}]}
tellraw @s {"extra": [{"extra": ["nested"]}]}
tellraw @s {"extra": [{"extra": [{"extra": ["nested again"]}]}]}

# "translate" and "with"
tellraw @s {"translate": "gui.toTitle"}
tellraw @s {"translate": "Text inserted here"}
tellraw @s {"translate": "commands.generic.entity.invalidType", "with": ["Creeper"]}
tellraw @s {"translate": "Insert a %s here.", "with": ["STRING"]}
tellraw @s {"translate": "custom.key", "with": ["STRING1", "STRING2"]}
tellraw @s {"translate": "Nearest player: %s", "with": [{"selector": "@p"}]}

# "keybind"
tellraw @s {"keybind": "key.drop"}

# "selector"
tellraw @s {"selector": ""}
tellraw @s {"selector": "Arcensoth"}
tellraw @s {"selector": "f7a39418-72ca-4bf2-bc7e-ba9df67a4707"}
tellraw @s {"selector": "@s"}
tellraw @s {"selector": "@e[sort=nearest, limit=1]"}

# "insertion"
tellraw @s {"insertion": "hello world"}
tellraw @s {"insertion": "/execute as @a run say hello @e[sort=nearest, limit=1]"}

# "score"
tellraw @s {"score": {"name": "@p", "objective": "TEST"}}
tellraw @s {"score": {"name": "*", "objective": "TEST"}}
tellraw @s {"score": {"name": "@p", "objective": "TEST", "value": 123}}
tellraw @s {"score": {"name": "@p", "objective": "TEST", "value": -123}}
tellraw @s {"score": {"name": "@p", "objective": "TEST", "value": 3.14}}
tellraw @s {"score": {"name": "@p", "objective": "TEST", "value": true}}
tellraw @s {"score": {"name": "@p", "objective": "TEST", "value": "hello world"}}
tellraw @s {"score": {"name": "@e[sort=nearest, limit=1]", "objective": "TEST", "value": "hello"}}
tellraw @s {"score": {"name": "#temp", "objective": "TEST"}}
tellraw @s {"score": {"name": "$mypack.calc", "objective": "TEST"}}

# "clickEvent"
tellraw @s {"text": "Click", "clickEvent": {"action": "open_url", "value": "http://google.com"}}
tellraw @s {"text": "Click", "clickEvent": {"action": "run_command", "value": "/say Must be OP'd to run this command"}}
tellraw @s {"text": "Click", "clickEvent": {"action": "suggest_command", "value": "Text replaced"}}

# "hoverEvent"
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_text", "value": "Basic string"}}
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_text", "value": ["", { "text": "Text\n", "color": "green", "underlined": true}, "component"]}}
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_achievement", "value": "achievement.openInventory"}}
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_achievement", "value": "stat.walkOneCm"}}
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_item", "value": "{id: \"minecraft:stone\", tag: {display: {Lore: [\"Lore line 1\", \"Lore line 2\"]}}}"}}
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_entity", "value": "{name: \"Skylinerw\", type: \"Creeper\", id: \"00000000-0000-0000-0000-000000000000\"}"}}
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_entity", "value": "{name: \"Skylinerw\", id: \"Not a valid UUID\"}"}}
tellraw @s {"text": "Hover", "hoverEvent": {"action": "show_item", "value": "{id: 'minecraft:stone', tag: {display: {Lore: ['Lore line 1', 'Lore line 2']}}}"}}

# "nbt", "entity", "block", and "interpret"
tellraw @s {"entity": "@s", "nbt": "SelectedItem"}
tellraw @s {"entity": "@s", "nbt": "SelectedItem.tag"}
tellraw @s {"entity": "@e[sort=nearest, limit=1]", "nbt": "SelectedItem.tag.display"}
tellraw @s {"entity": "@s", "nbt": "SelectedItem.tag.display.Name", "interpret": true}
tellraw @s {"block": "~ ~-1 ~", "nbt": "RecordItem"}
tellraw @s {"block": "~ ~-1 ~", "nbt": "RecordItem.tag"}
tellraw @s {"block": "~ ~-1 ~", "nbt": "RecordItem.tag.display"}
tellraw @s {"block": "10 20 30", "nbt": "RecordItem"}
tellraw @s {"block": "10 ~20 30", "nbt": "RecordItem"}
tellraw @s {"block": "10 ~ 30", "nbt": "RecordItem"}
tellraw @s {"block": "~10 20 ~30", "nbt": "RecordItem"}
tellraw @s {"block": "~10 ~20 ~30", "nbt": "RecordItem"}
tellraw @s {"block": "~ ~ ~", "nbt": "RecordItem"}
tellraw @s {"block": "^10 ^20 ^30", "nbt": "RecordItem"}
tellraw @s {"block": "^10 ^ ^30", "nbt": "RecordItem"}

# nested lists
tellraw @s ["Hello ", {"selector": "@e[sort=nearest, limit=1]"}, ", how are you?"]
tellraw @s ["Hello ", {"selector": "@e[sort=nearest, limit=1]"}, ", how are you?"]
tellraw @s ["a", ["b", {"text": "c"}, ["d"], "e"]]
tellraw @s ["a", ["b", {"text": "c"}, ["d"], "e"], {"text":"f", "extra": [{"text": "g"}]}]
