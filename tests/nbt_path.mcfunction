# test valid basic property access
data get entity @s SelectedItem
data get entity @s SelectedItem.
data get entity @s SelectedItem.tag
data get entity @s SelectedItem.tag.
data get entity @s SelectedItem.tag.display

# test invalid multi dots
data get entity @s SelectedItem..tag
data get entity @s SelectedItem...tag
data get entity @s SelectedItem....tag
data get entity @s SelectedItem..tag.custom
data get entity @s SelectedItem..tag..custom

# test valid list access
data get entity @s Inventory[]
data get entity @s Inventory[0]
data get entity @s Inventory[-1]
data get entity @s Inventory[].tag

# test invalid list access
data get entity @s Inventory[ 0 ]
data get entity @s Inventory[0.5]
data get entity @s Inventory[true]
data get entity @s Inventory[1, 2]

# test valid list access with compound
data get entity @s Inventory[{}]
data get entity @s Inventory[{Count: 64}]
data get entity @s Inventory[{id: "minecraft:diamond"}]

# test invalid list access with compound
data get entity @s Inventory[ {} ]
data get entity @s Inventory[x{}]
data get entity @s Inventory[{}x]
data get entity @s Inventory[x{}x]
data get entity @s Inventory[ {Count: 64} ]

# test valid compound access
data get entity @s Inventory[].tag{custom: true}.display.Name

# test list access leak
data get entity @s Inventory[
say hello

# test compound access leak
data get entity @s Inventory[].tag{custom: true
say hello

# test inner list leak
data get entity @s Inventory[[
say hello

# test inner compound leak
data get entity @s Inventory[{
say hello
