# valid, with namespace
function mypack:foo
function mypack:foo/bar
function mypack:foo/bar/baz
function #mypack:foo
function #mypack:foo/bar
function #mypack:foo/bar/baz

# valid, without namespace
function foo
function foo/bar
function foo/bar/baz
function #foo
function #foo/bar
function #foo/bar/baz

# valid, with trailing command
execute if block ~ ~ ~ mypack:foo run say hi
execute if block ~ ~ ~ mypack:foo/bar run say hi
execute if block ~ ~ ~ mypack:foo/bar/baz run say hi
execute if block ~ ~ ~ #mypack:foo run say hi
execute if block ~ ~ ~ #mypack:foo/bar run say hi
execute if block ~ ~ ~ #mypack:foo/bar/baz run say hi

# invalid
function mypack:
function :foo
function #mypack:
function #:foo
function mypack:/
function mypack:foo/
function mypack:/foo
function #mypack:/
function #mypack:foo/
function #mypack:/foo

# invalid, with trailing command
execute if block ~ ~ ~ mypack: run say hi
execute if block ~ ~ ~ :foo run say hi
execute if block ~ ~ ~ mypack:/ run say hi
execute if block ~ ~ ~ mypack:foo/ run say hi
execute if block ~ ~ ~ mypack:/foo run say hi
execute if block ~ ~ ~ mypack:/ run say hi
execute if block ~ ~ ~ mypack:foo/ run say hi
execute if block ~ ~ ~ mypack:/foo run say hi
execute if block ~ ~ ~ #mypack:/ run say hi
execute if block ~ ~ ~ #mypack:foo/ run say hi
execute if block ~ ~ ~ #mypack:/foo run say hi
