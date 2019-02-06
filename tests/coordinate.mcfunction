# test valid relative coordinates
execute positioned ~ ~ ~ run
execute positioned ~ ~10 ~ run
execute positioned ~ ~0.5 ~ run
execute positioned ~ ~.5 ~ run
execute positioned ~ ~-10 ~ run
execute positioned ~ ~-0.5 ~ run
execute positioned ~ ~-.5 ~ run

# test valid local coordinates
execute positioned ^ ^ ^ run
execute positioned ^ ^10 ^ run
execute positioned ^ ^0.5 ^ run
execute positioned ^ ^.5 ^ run
execute positioned ^ ^-10 ^ run
execute positioned ^ ^-0.5 ^ run
execute positioned ^ ^-.5 ^ run

# test invalid relative coordinates
execute positioned ~ ~. ~ run
execute positioned ~ ~5. ~ run
execute positioned ~ ~- ~ run
execute positioned ~ ~-. ~ run
execute positioned ~ ~-5. ~ run

# test invalid local coordinates
execute positioned ^ ^. ^ run
execute positioned ^ ^5. ^ run
execute positioned ^ ^- ^ run
execute positioned ^ ^-. ^ run
execute positioned ^ ^-5. ^ run
