# literal
# without contenxt, there is no way to differentiate
# literal arguments from literal subcommands
tag @s add mytag

# literal
tag @s add my_tag

# unquoted string
# could be confused with an nbt path
# but nbt paths typically have at least one capital letter
tag @s add my.tag

# unquoted string
tag @s add my-tag

# maybe nbt path
data get entity @s My.Tag

# definitely nbt path
data get entity @s My.Tag[0]

# literal
say hello

# literals
say hello world

# quoted string
say "hello world"
