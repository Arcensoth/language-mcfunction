# test argument types
execute if block ~ ~ ~ minecraft:oak_log[axis=x] run
execute if block ~ ~ ~ minecraft:oak_leaves[distance=5] run
execute if block ~ ~ ~ minecraft:oak_leaves[persistent=true] run

# test multiple arguments
execute if block ~ ~ ~ minecraft:oak_leaves[distance=5,persistent=true] run

# test tagged variant
execute if block ~ ~ ~ #minecraft:leaves[distance=5] run
execute if block ~ ~ ~ #minecraft:leaves[distance=5,persistent=true] run
