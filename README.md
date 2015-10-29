## Selfish

It's a fast way to not function `this`. Wait, that doesn't make sense.

As a by-product of bypassing `this`, it also enables a sort of
"self-syntax," although there's no reason you have to call it "self."

Uses `object.create(null)` by default, which is speedy and clean, but
it can optionally accept a different "base." See below.

```js

Selfish.simple(function (self) {
  self.a = 'a'
  self.b = function (c) {
    return self.a + ' ' + self.c
  }
}) // => { a: 'a', b: function (c) { ... } }

function AConstructor() {
  return function (a) {
    return Selfish.simple(function (self) {
      self.a = a
    })
  }
}

var A = Selfish.variadic.any([function (self, a, b, c) {
  self.a = a
  self.b = b
  self.c = c
}, 1, 'b', 'c'], AConstructor()) // => function (a) { ... }

A.a // => 1
A.b // => 'b'
A.c // => 'c'

A(7) // => { a: 7 }

```
