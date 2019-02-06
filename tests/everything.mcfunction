# this is a comment
function mypack:foo
function #mypack:footag
function mypack:foo/bar
execute if block ~ ~ ~ minecraft:stone
execute as @a[sort=arbitrary]
execute as @a[sort=nearest] at @s[tag=sometag] run function mypack:foobar
execute as @a[distance=0.2..0.8] run
execute as @a[x_rotation=-0.1..] run
execute if score @a temp matches 1 run
execute if score @a temp matches -1 run
execute positioned ~ ~10 ~ run
execute positioned ^ ^0.5 ^ run
