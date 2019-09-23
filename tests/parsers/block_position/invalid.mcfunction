# bad decimals with absolutes
execute if block 10 0.5 -10 minecraft:stone run say hello
execute if block 10 .5 -10 minecraft:stone run say hello
execute if block 10 -0.5 -10 minecraft:stone run say hello
execute if block 10 -.5 -10 minecraft:stone run say hello

# bad decimals with relatives
execute if block ~10 ~0.5 ~-10 minecraft:stone run say hello
execute if block ~10 ~.5 ~-10 minecraft:stone run say hello
execute if block ~10 ~-0.5 ~-10 minecraft:stone run say hello
execute if block ~10 ~-.5 ~-10 minecraft:stone run say hello

# bad decimals with locals
execute if block ^10 ^0.5 ^-10 minecraft:stone run say hello
execute if block ^10 ^.5 ^-10 minecraft:stone run say hello
execute if block ^10 ^-0.5 ^-10 minecraft:stone run say hello
execute if block ^10 ^-.5 ^-10 minecraft:stone run say hello

# bad mixed locals
execute if block 1 2 ^3 minecraft:stone run say hello
execute if block 1 ^2 3 minecraft:stone run say hello
execute if block ^1 2 3 minecraft:stone run say hello
execute if block ~1 ~2 ^3 minecraft:stone run say hello
execute if block ~1 ^2 ~3 minecraft:stone run say hello
execute if block ^1 ~2 ~3 minecraft:stone run say hello

# not a real operator
execute if block %1 %2 %3 minecraft:stone run say hello
