# all absolutes
execute positioned 10 0 -10 run say hello
execute positioned 10 10 -10 run say hello
execute positioned 10 0.5 -10 run say hello
execute positioned 10 .5 -10 run say hello
execute positioned 10 -10 -10 run say hello
execute positioned 10 -0.5 -10 run say hello
execute positioned 10 -.5 -10 run say hello

# absolutes mixed with relatives
execute positioned 10 ~ -10 run say hello
execute positioned 10 ~10 -10 run say hello
execute positioned 10 ~0.5 -10 run say hello
execute positioned 10 ~.5 -10 run say hello
execute positioned 10 ~-10 -10 run say hello
execute positioned 10 ~-0.5 -10 run say hello
execute positioned 10 ~-.5 -10 run say hello

# all relatives
execute positioned ~10 ~ ~-10 run say hello
execute positioned ~10 ~10 ~-10 run say hello
execute positioned ~10 ~0.5 ~-10 run say hello
execute positioned ~10 ~.5 ~-10 run say hello
execute positioned ~10 ~-10 ~-10 run say hello
execute positioned ~10 ~-0.5 ~-10 run say hello
execute positioned ~10 ~-.5 ~-10 run say hello

# all locals (can't be mixed)
execute positioned ^10 ^ ^-10 run say hello
execute positioned ^10 ^10 ^-10 run say hello
execute positioned ^10 ^0.5 ^-10 run say hello
execute positioned ^10 ^.5 ^-10 run say hello
execute positioned ^10 ^-10 ^-10 run say hello
execute positioned ^10 ^-0.5 ^-10 run say hello
execute positioned ^10 ^-.5 ^-10 run say hello
