# all absolutes
execute if block 10 0 -10 minecraft:stone run say hello
execute if block 10 10 -10 minecraft:stone run say hello
execute if block 10 -10 -10 minecraft:stone run say hello

# absolutes mixed with relatives
execute if block 10 ~ -10 minecraft:stone run say hello
execute if block 10 ~10 -10 minecraft:stone run say hello
execute if block 10 ~-10 -10 minecraft:stone run say hello

# all relatives
execute if block ~10 ~ ~-10 minecraft:stone run say hello
execute if block ~10 ~10 ~-10 minecraft:stone run say hello
execute if block ~10 ~-10 ~-10 minecraft:stone run say hello

# all locals (can't be mixed)
execute if block ^10 ^ ^-10 minecraft:stone run say hello
execute if block ^10 ^10 ^-10 minecraft:stone run say hello
execute if block ^10 ^-10 ^-10 minecraft:stone run say hello
