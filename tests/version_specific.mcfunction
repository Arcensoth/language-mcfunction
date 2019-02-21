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
#
# @returns The number of entities hit by the ray.

# TODO something really important

execute
execute foo
execute as
execute as foo
execute as @s
execute as @s foo
execute as @s execute 
execute as @s execute as
execute as @s execute as @s
execute as @s as
execute as @s as foo
execute as @s as @s
execute run
execute run foo
execute run execute
execute run execute foo
execute run execute run
execute as @s run
execute as @s run foo
execute as @s run as
execute as @s run as @s
execute as @s run execute
execute as @s run execute foo
execute as @s run execute as @s run

execute as @s run execute as @s run say hello
execute as 0-0-0-0-0 run execute as @s run say hello
execute as f7a39418-72ca-4bf2-bc7e-ba9df67a4707 run execute as @s run say hello
execute as Arcensoth run execute as @s run say hello
execute as some_guy run execute as @s run say hello

# valid
execute as @s[] run execute as @s run say hello
execute as @s[ ] run execute as @s run say hello
execute as @s[tag=foo] run execute as @s run say hello
execute as @s[tag=!foo] run execute as @s run say hello
execute as @s[ tag = foo ] run execute as @s run say hello
execute as @s[ tag = !foo ] run execute as @s run say hello
execute as @s[ tag = ! foo ] run execute as @s run say hello
execute as @s[tag=foo,tag=bar] run execute as @s run say hello
execute as @s[ tag=foo,tag=bar] run execute as @s run say hello
execute as @s[tag=foo,tag=bar ] run execute as @s run say hello
execute as @s[tag=foo ,tag=bar] run execute as @s run say hello
execute as @s[tag=foo, tag=bar] run execute as @s run say hello
execute as @s[tag=foo , tag=bar] run execute as @s run say hello
execute as @s[ tag = foo , tag = bar ] run execute as @s run say hello
execute as @s[tag = foo ,tag = bar ] run execute as @s run say hello
execute as @s[tag = foo , tag = bar ] run execute as @s run say hello
execute as @s[ tag = foo ,tag  = bar ] run execute as @s run say hello
execute as @s[ tag = foo , tag = bar ] run execute as @s run say hello
execute as @s[tag   =   foo    ,tag   =   bar   ] run execute as @s run say hello
execute as @s[tag   =   foo,tag   =   bar   ] run execute as @s run say hello
execute as @s[tag   =   foo,   tag   =   bar   ] run execute as @s run say hello
execute as @s[   tag   =   foo    ,   tag   =   bar   ] run execute as @s run say hello
execute as @s[tag   =   foo    ,   tag   =   bar] run execute as @s run say hello
execute as @s[ tag = foo , tag = bar , tag = baz ] run execute as @s run say hello
execute as @s[nbt={custom: true}] as @s run say hello
execute as @s[nbt=!{custom: true}] as @s run say hello
execute as @e[tag=foo, sort=nearest, nbt={custom: true}] run execute as @s run execute as @s run say hello

# invalid
execute as @s[]run execute as @s run say hello
execute as @s[ ]run execute as @s run say hello
execute as @s [] run execute as @s run say hello
execute as @s [ ] run execute as @s run say hello
execute as @s[foo] run execute as @s run say hello
execute as @s[foo ] run execute as @s run say hello
execute as @s[ foo] run execute as @s run say hello
execute as @s[ foo ] run execute as @s run say hello
execute as @s[,] run execute as @s run say hello
execute as @s[ ,] run execute as @s run say hello
execute as @s[, ] run execute as @s run say hello
execute as @s[ , ] run execute as @s run say hello
execute as @s[,tag=foo] run execute as @s run say hello
execute as @s[ ,tag=foo] run execute as @s run say hello
execute as @s[tag,tag=foo] run execute as @s run say hello
execute as @s[tag ,tag=foo] run execute as @s run say hello
execute as @s[tag=,tag=foo] run execute as @s run say hello
execute as @s[tag=foo,] run execute as @s run say hello
execute as @s[tag=foo ,, tag=bar] run execute as @s run say hello
execute as @s[tag=foo , , tag=bar] run execute as @s run say hello
execute as @s[tag=foo,tag] run execute as @s run say hello
execute as @s[tag=foo,tag=] run execute as @s run say hello
execute as @s[tag=foo,tag,tag=bar] run execute as @s run say hello
execute as @s[tag=foo,tag=,tag=bar] run execute as @s run say hello

# valid
execute as @e[sort=nearest] run
execute as @e[ sort = nearest ] run
execute as @e[  sort  =  nearest  ] run

# invalid
execute as @e[sort] run
execute as @e[sort=] run
execute as @e[sort=foo] run
execute as @e[sort=nearestfoo] run
execute as @e[sort=foonearest] run
execute as @e[sort=!nearest] run

# valid
execute as @e[limit=1] run
execute as @e[limit=01] run
execute as @e[ limit = 1 ] run
execute as @e[  limit  =  1  ] run

# invalid
execute as @e[limit] run
execute as @e[limit=] run
execute as @e[limit=foo] run
execute as @e[limit=nearest] run
execute as @e[limit=0.1] run
execute as @e[limit=-1] run
execute as @e[limit=!1] run

# valid
say hello
say hello world
say hello @e world
say hello@eworld
say hello@e[tag=foo]world
say @@e[tag=x,tag=!x]e

# invalid
say hello@e[world
say hello@e[tag]world
say hello@e[tag=]world

# valid
tellraw @s {"selector": ""}
tellraw @s {"text": "hello \"escaped\" world"}
tellraw @s {"text": "boldly go", "bold": true}
tellraw @s {"selector": "Arcensoth"}
tellraw @s {"selector": "f7a39418-72ca-4bf2-bc7e-ba9df67a4707"}
tellraw @s {"selector": "@s"}
tellraw @s {"selector": "@e[sort=nearest, limit=1]"}
tellraw @s ["Hello ", {"selector": "@e[sort=nearest, limit=1]"}, ", how are you?"]

# invalid
tellraw @s {"selector": "not a target"}
tellraw @s {"text": "oh", "bold": "no"}
tellraw @s {"unknown": "unknown text component key"}
tellraw @s {"selector": "@e["}
tellraw @s {"selector": "@e]"}
tellraw @s {"selector": "@e[sort"}
tellraw @s {"selector": "@e[sort]"}
tellraw @s {"selector": "@e[sort="}
tellraw @s {"selector": "@e[sort=foo"}
tellraw @s {"selector": "@e[sort=foo]"}
tellraw @s {"selector": "@e[sort=nearest"}
tellraw @s {"selector": "@e[sort=nearest,"}
tellraw @s {"selector": "@e[sort=nearest,]"}
