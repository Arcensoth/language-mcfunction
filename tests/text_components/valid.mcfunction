# See: https://github.com/skylinerw/guides/blob/master/java/text%20component.md

# "text", escaping, "bold", "italic", and "underline"
tellraw @s {"text": "hello world"}
tellraw @s {"text": "hello \"escaped\" world"}
tellraw @s {"bold": true}
tellraw @s {"text": "boldly go", "bold": true}
tellraw @s {"italic": true}
tellraw @s {"text": "boldly go", "italic": true}
tellraw @s {"underline": true}
tellraw @s {"text": "boldly go", "underline": true}

# "translate" and "with"
tellraw @s {"translate": "gui.toTitle"}
tellraw @s {"translate": "Text inserted here"}
tellraw @s {"translate": "commands.generic.entity.invalidType","with":["Creeper"]}
tellraw @s {"translate": "Insert a %s here.","with":["STRING"]}
tellraw @s {"translate": "custom.key", "with": ["STRING1", "STRING2"]}
tellraw @s {"translate": "Nearest player: %s", "with":[{"selector": "@p"}]}

# "selector"
tellraw @s {"selector": ""}
tellraw @s {"selector": "Arcensoth"}
tellraw @s {"selector": "f7a39418-72ca-4bf2-bc7e-ba9df67a4707"}
tellraw @s {"selector": "@s"}
tellraw @s {"selector": "@e[sort=nearest, limit=1]"}

# nested lists
tellraw @s ["Hello ", {"selector": "@e[sort=nearest, limit=1]"}, ", how are you?"]
tellraw @s ["a", ["b", {"text": "c"}, ["d"], "e"]]
tellraw @s ["a", ["b", {"text": "c"}, ["d"], "e"], {"text":"f", "extra": [{"text": "g"}]}]
