#> Raycasting
# Casts a ray from starting position up to 128 blocks away.

function mypack:raycast/loop
function #mypack:hooks/raycast/begin
effect give @s minecraft:night_vision 999999 1 true
execute if score @a temp matches 10..20
execute positioned 10 ~10 -10
execute positioned 10 ^0.5 -10
execute if block ~ ~ ~ minecraft:oak_leaves[persistent=true]
execute if block ~ ~ ~ #minecraft:leaves[distance=5,persistent=false]
setblock ~ ~ ~ minecraft:dispenser[facing=up]{Items: [{id: "minecraft:diamond", Count: 1}]}
tag @s add my.tag
datapack enable "hello world"
datapack enable "escape \" me"
datapack enable 'single quotes'
give @s minecraft:diamond_sword{display: {Name: '"My Custom Sword"'}}
execute as f7a39418-72ca-4bf2-bc7e-ba9df67a4707 run say hello
execute as 0-0-0-0-0 run say goodbye
execute as @a[sort=nearest]
execute as @a[gamemode=!creative]
execute as @a[tag=foo,tag=bar,tag=!baz]
execute as @a[distance=100]
execute as @a[distance=1..19]
execute as @a[distance=...001]
execute as @a[type=minecraft:bat]
execute as @a[type=!#minecraft:skeletons,type=!minecraft:zombie]
execute as @a[name="Custom Name"] as @s
execute as @e[nbt={ PortalCooldown: 0 }]
execute as @e[nbt={ Item: {id: "minecraft:diamond", Count: 64 } }]
execute if score @s foo < @s bar
scoreboard players operation @s foo %= @s bar
data get entity @s SelectedItem.tag.display.Name
data get entity @s Inventory[0]
data get entity @s Inventory[{id: "minecraft:diamond"}].Count
data get entity @s Inventory[].tag{custom: true}.display.Name
data merge entity @s { foo: true, bar: 1234 }
data modify block ~ ~ ~ RecordItem.tag set value { messages: [hi, bye] }
data modify block ~ ~ ~ RecordItem.tag.messages append value [ { message: "hello world" } ]
tellraw @a {"text": "hello world", "color": "blue"}
tellraw @a [{"text": "hello", "color": "blue"}, {"text": "world", "color": "blue"}]
execute as @a[scores={myscore=1..}]
execute as @a[scores={foo=10, bar=1..5, baz=..0}]
execute as @a[advancements={mypack:some/advancement=true}]
execute as @a[advancements={mypack:another/advancement={foo=true, bar=false}}]

