# basic property access
data modify entity @s SelectedItem set value true
data modify entity @s SelectedItem. set value true
data modify entity @s SelectedItem.tag set value true
data modify entity @s SelectedItem.tag. set value true
data modify entity @s SelectedItem.tag.display set value true

# list access
data modify entity @s Inventory[] set value true
data modify entity @s Inventory[0] set value true
data modify entity @s Inventory[-1] set value true
data modify entity @s Inventory[].tag set value true

# list access with compound
data modify entity @s Inventory[{}] set value true
data modify entity @s Inventory[{Count: 64}] set value true
data modify entity @s Inventory[{id: "minecraft:diamond"}] set value true

# adjacent list access
data modify entity @s Item.tag.foo[][] set value true
data modify entity @s Item.tag.foo[0][] set value true
data modify entity @s Item.tag.foo[][0] set value true
data modify entity @s Item.tag.foo[0][0] set value true
data modify entity @s Item.tag.foo[][][] set value true
data modify entity @s Item.tag.foo[][0][] set value true
data modify entity @s Item.tag.foo[][{}][] set value true

# compound access
data get entity @s Inventory[].tag{custom: true}.display.Name
