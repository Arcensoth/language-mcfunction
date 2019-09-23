# exact numbers
execute if score @s foo matches -1 run say hello
execute if score @s foo matches 0 run say hello
execute if score @s foo matches 1 run say hello

# minimum
execute if score @s foo matches 1.. run say hello
execute if score @s foo matches 0.. run say hello
execute if score @s foo matches -1.. run say hello

# maximum
execute if score @s foo matches ..1 run say hello
execute if score @s foo matches ..0 run say hello
execute if score @s foo matches ..-1 run say hello

# min and max
execute if score @s foo matches -1..1 run say hello
