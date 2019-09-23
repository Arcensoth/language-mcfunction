# bad decimals with absolutes
execute rotated 10 . run say hello
execute rotated 10 5. run say hello
execute rotated 10 - run say hello
execute rotated 10 -. run say hello
execute rotated 10 -5. run say hello

# bad decimals with relatives
execute rotated ~10 ~. run say hello
execute rotated ~10 ~5. run say hello
execute rotated ~10 ~- run say hello
execute rotated ~10 ~-. run say hello
execute rotated ~10 ~-5. run say hello

# can't use locals with rotation
execute rotated ^10 ^ run say hello
execute rotated ^10 ^10 run say hello
execute rotated ^10 ^0.5 run say hello
execute rotated ^10 ^.5 run say hello
execute rotated ^10 ^-10 run say hello
execute rotated ^10 ^-0.5 run say hello
execute rotated ^10 ^-.5 run say hello
