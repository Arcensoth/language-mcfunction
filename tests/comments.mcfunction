#> Raycasting
#
# Casts a ray from starting position along a configurable number
# of blocks with a confugrable accuracy, counting the number of
# entities hit by the ray along the way.
#
# @params
#   $mypack.raycast.distance param
#       The number of blocks to cast forward.
#   $mypack.raycast.precision param
#       The ratio of block precision to a full block.
#
# @returns
#   $mypack.raycast.result return
#       The number of entities hit by the ray.

# @test no longer part of the block comment
execute as @s run say this should not be a comment

execute as @s run say this should also not be a comment

# Non-highlighted block
# @hello this block is not highlighted
# because the first line doesn't have a prefix

#> Another block
# @hello this is another block
# and this is the end

execute as @s run say this should be a command

    #> An indented block
    # @hello does this still work?
    # hopefully it does
    execute as @s run say goodbye world

#> Yet another block
    # @except this time
        # we have very strange indents
execute as @s run say goodbye world
    execute as @s run say goodbye world
        execute as @s run say goodbye world

#> Yet another block
# @yeah another one
# blah blah blah
execute as @s run say this should also be a command
execute as @s run say this should also also be a command

execute as @s run say this should also also also be a command
