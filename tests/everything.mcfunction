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
# @returns The number of entities hit by the ray.

function #mypack:hooks/raycast/begin

# TODO optimize entity selectors
function mypack:raycast/loop

function #mypack:hooks/raycast/begin

# this is a comment
say hello world

    # indented comment
    say hello indent

execute store

function mypack:foo
function #mypack:footag
function mypack:foo/bar

execute positioned 10 ~10 -10 run
execute positioned 10 ~-0.5 -10 run
execute positioned 10 ^0.5 -10 run
execute positioned 10 ^-10 -10 run

execute if score @a temp matches 10 run
execute if score @a temp matches 10.. run
execute if score @a temp matches 2020 run
execute if score @a temp matches ..20 run
