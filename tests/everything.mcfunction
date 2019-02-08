# this is a comment
say hello world

    # indented comment
    say hello indent

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
