# test valid
execute if block ~ ~ ~ minecraft:oak_leaves[distance=5] run
execute if block ~ ~ ~ minecraft:oak_leaves[distance=5,persistent=true] run
execute if block ~ ~ ~ #minecraft:leaves[distance=5] run
execute if block ~ ~ ~ #minecraft:leaves[distance=5,persistent=true] run
