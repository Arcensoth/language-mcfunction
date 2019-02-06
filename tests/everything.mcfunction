# this is a comment
function mypack:foo
function #mypack:footag
function mypack:foo/bar
execute if block ~ ~ ~ minecraft:stone
execute as @a[sort=arbitrary]
execute as @a[sort=nearest] at @s[tag=sometag] run function mypack:foobar
