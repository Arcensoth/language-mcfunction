# multi dots
data modify entity @s SelectedItem..tag set value true
data modify entity @s SelectedItem...tag set value true
data modify entity @s SelectedItem....tag set value true
data modify entity @s SelectedItem..tag.custom set value true
data modify entity @s SelectedItem..tag..custom set value true

# list access
data modify entity @s Inventory[ 0] set value true
data modify entity @s Inventory[0 ] set value true
data modify entity @s Inventory[ 0 ] set value true
data modify entity @s Inventory[0.5] set value true
data modify entity @s Inventory[true] set value true
data modify entity @s Inventory[1, 2] set value true

# trailing bracket data
data modify entity @s Inventory[0]tag set value true
data modify entity @s Inventory[{}]tag set value true
data modify entity @s Inventory{}tag set value true

# list access with compound
data modify entity @s Inventory[ {} ] set value true
data modify entity @s Inventory[x{}] set value true
data modify entity @s Inventory[{}x] set value true
data modify entity @s Inventory[x{}x] set value true
data modify entity @s Inventory[ {Count: 64} ] set value true

# test list access leak
data get entity @s Inventory[
data get entity @s Inventory[set value true
data get entity @s Inventory[ set value true
say hello

# test compound access leak
data get entity @s Inventory[].tag{custom: true
data get entity @s Inventory[].tag{set value true
data get entity @s Inventory[].tag{ set value true
say hello

# test inner list leak
data get entity @s Inventory[[
say hello

# test inner compound leak
data get entity @s Inventory[{
say hello
