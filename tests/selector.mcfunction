# test valid
execute as @b
execute as @a
execute as @a[]
execute as @a[tag=foo]
execute as @a[tag=!foo]

# test valid with trailing command
execute as @a run
execute as @a[] run
execute as @a[tag=foo] run
execute as @a[tag=!foo] run

# test valid with mixed selectors
execute as @a as @a run
execute as @a as @a[sort=nearest] run
execute as @a[sort=nearest] as @a run
execute as @a[sort=nearest] as @a[sort=nearest] run
teleport @a @s

# test valid basic argument types
execute as @a[sort=nearest]
execute as @a[name="my name"]
execute as @a[type=mypack:foo]
execute as @a[type=#mypack:foo]
execute as @a[distance=15]
execute as @a[distance=..10]
execute as @a[distance=11..19]
execute as @a[distance=20..]
execute as @a[distance=0.5]
execute as @a[distance=..0.1]
execute as @a[distance=0.2..0.8]
execute as @a[distance=0.9..]

# TODO test valid scores argument

# TODO test valid advancement argument

# test valid multiple arguments
execute as @a[sort=nearest,limit=1] run
execute as @a[sort=nearest, limit=1] run
execute as @a[sort=nearest, limit=1, distance=0] run
execute as @a[sort=nearest, tag=!foo, tag=bar] run

# test valid arguments in separate selectors
execute as @a[sort=nearest] as @s[tag=foo] run
execute as @a[sort=nearest,limit=1] as @a[tag=foo] run
execute as @a[sort=nearest] as @a[tag=foo,tag=bar] run
execute as @a[sort=nearest,limit=1] as @a[tag=foo,tag=bar] run

# test invalid
execute as @
execute as @A
execute as @ab
execute as @0
execute as @_
execute as @a[
execute as @a]

# test invalid with trailing command
execute as @ run
execute as @a[ run
execute as @a] run

# test invalid basic arguments
execute as @a[sort] run
execute as @a[sort=] run
execute as @a[=nearest] run

# test invalid quoted string argument
execute as @a[name=my name] run
execute as @a[name="my name] run
execute as @a[name=my name"] run

# test invalid resource location argument
execute as @a[type=mypack:] run
execute as @a[type=:foo] run
execute as @a[type=#mypack:] run
execute as @a[type=#:foo] run

# TODO test invalid scores argument

# TODO test invalid advancement argument
