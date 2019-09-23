# without namespace
execute in overworld run say hello
execute in the_nether run say hello
execute in the_end run say hello

# with namespace
execute in minecraft:overworld run say hello
execute in minecraft:the_nether run say hello
execute in minecraft:the_end run say hello

# nested
execute in minecraft:overworld in minecraft:the_nether run say hello

# custom dimension
execute in minecraft:the_aether run say hello
