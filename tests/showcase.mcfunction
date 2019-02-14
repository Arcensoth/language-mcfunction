## Raycasting
#
# Casts a ray from starting position along a configurable number
# of blocks with a confugrable accuracy, counting the number of
# entities hit by the ray along the way.
#
# @params
#   mypack.raycast.distance temp
#       The number of blocks to cast forward.
#   mypack.raycast.precision temp
#       The ratio of block precision to a full block.
# @returns The number of entities hit by the ray.

# TODO use real commands
function mypack:raycast/loop
function #mypack:hooks/raycast/begin
effect give @s minecraft:night_vision 999999 1 true
execute if score @a temp matches 10..20 run
execute positioned 10 ~10 -10 run
execute positioned 10 ^0.5 -10 run
execute if block ~ ~ ~ minecraft:oak_leaves[persistent=true] run
execute if block ~ ~ ~ #minecraft:leaves[distance=5,persistent=false] run
tag @s add my.tag
datapack enable "hello world"
datapack enable "escape \" me"
execute as f7a39418-72ca-4bf2-bc7e-ba9df67a4707 run
execute as 0-0-0-0-0 run
execute as @a[sort=nearest] run
execute as @a[gamemode=survival] run
execute as @a[gamemode=!creative] run
execute as @a[tag=foo,tag=bar,tag=!baz] run
execute as @a[distance=100]
execute as @a[distance=11..19]
execute as @a[distance=..0.1]
execute as @a[type=minecraft:bat] run
execute as @a[type=!minecraft:cow,type=!minecraft:pig] run
execute as @a[type=#minecraft:skeletons] run
execute as @a[type=!#minecraft:skeletons,type=!minecraft:zombie] run
execute as @a[name="Custom Name"] as @s run
