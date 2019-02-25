tellraw @s xtrue
tellraw @s xtrue,
tellraw @s true,
tellraw @s [true,]
tellraw @s [xtrue,]
tellraw @s truex
tellraw @s xtruex

tellraw @s {"bold": foo}
tellraw @s {"bold": "true"}

tellraw @s {"color": "foo"}

tellraw @s {"keybind": "foo"}

tellraw @s { "extra" : foo }
tellraw @s { "extra" : foo, "text": "hello" }
tellraw @s { "extra" : "{}" }
tellraw @s { "extra" : "{ a : [ { b : c} ] }" }
tellraw @s { "extra" : "{ a : " " }
tellraw @s { "extra" : "{ a : \" " }
tellraw @s { "extra" : "[]" }
tellraw @s { "extra" : "[ { a : b } ] " }
tellraw @s { "extra" : "[ { a : \" } ] " }
tellraw @s { "extra" : "[ { a : " } ] " }

tellraw @s { "text": "hello", "extra" : "{}" }
tellraw @s { "extra" : "{}", "text": "hello" }
tellraw @s [{ "extra" : "{}" }, { "extra" : "{}" }]

tellraw @s { "unknown" : "{}" }
tellraw @s { "unknown" : "[]" }
tellraw @s { "extra" : [ { "unknown" : "foo" } ] }
tellraw @s { "extra" : [ { "unknown" : "{}" } ] }
tellraw @s { "extra" : [ { "unknown" : "[]" } ] }
tellraw @s { "foo" : { "bar" : "{}" } }
tellraw @s { "foo" : { "bar" : "[]" } }
tellraw @s { "foo" : [ { "bar" : "{}" } ] }
tellraw @s { "foo" : [ { "bar" : "[]" } ] }

tellraw @s {"text"}
tellraw @s {"text
tellraw @s {"text"
tellraw @s {"text":
tellraw @s {"text":}
tellraw @s {"text":}
tellraw @s {"text": }
tellraw @s {"text":  }
tellraw @s {"text":   }
tellraw @s {"text":foo}
tellraw @s {"text": foo}
tellraw @s {"text":  foo}
tellraw @s {"text":   foo}
tellraw @s {"text":   foo   }
tellraw @s {"text" foo}
tellraw @s {"text"   foo   }
tellraw @s {"text": 0}
tellraw @s {"text": true}
tellraw @s {"text": hello world}
tellraw @s {"translate": true}
tellraw @s {"translate": hello world}
tellraw @s {"translate": true, "text"}
tellraw @s {"translate": true, "text":}
tellraw @s {"translate": true, "text": true}
tellraw @s {"translate": true, "text": "hello"}
tellraw @s {"translate": two words, "text": "hello"}
tellraw @s {"translate": "two words", "text": uh oh}
tellraw @s {"translate": true, "text": hello world}
tellraw @s {"translate": true, "unknown": true}

tellraw @s {"unknown": "unknown text component key"}
tellraw @s {"selector": "not a target"}
tellraw @s {"selector": " @e"}
tellraw @s {"selector": "@e "}
tellraw @s {"selector": " @e "}
tellraw @s {"selector": "@e["}
tellraw @s {"selector": "@e]"}
tellraw @s {"selector": "@e[sort"}
tellraw @s {"selector": "@e[sort]"}
tellraw @s {"selector": "@e[sort="}
tellraw @s {"selector": "@e[sort=foo"}
tellraw @s {"selector": "@e[sort=foo]"}
tellraw @s {"selector": "@e[sort=nearest"}
tellraw @s {"selector": " @e[sort=nearest]"}
tellraw @s {"selector": "@e[sort=nearest] "}
tellraw @s {"selector": " @e[sort=nearest] "}
tellraw @s {"selector": "@e[sort=nearest,"}
tellraw @s {"selector": "@e[sort=nearest,]"}
tellraw @s [{"extra": "x"}]
tellraw @s [{"extra": {"foo": [0, [1, 2], 3]}}]
