// NOTE(jordan): optimized argument counts
// this is a place where macros would be useful
var Selfish$Variadic$1 = function (constructor, a, base) {
  return (function (self) {
    constructor(self, a);
    return self;
  })(base || Object.create(null))
}

var Selfish$Variadic$2 = function (constructor, a, b, base) {
  return (function (self) {
    constructor(self, a, b);
    return self;
  })(base || Object.create(null))
}

var Selfish$Variadic$3 = function (constructor, a, b, c, base) {
  return (function (self) {
    constructor(self, a, b, c);
    return self;
  })(base || Object.create(null))
}

// NOTE(jordan): performance may be better now with Array args?
var Selfish$Variadic = function (args, base) {
  var constructor = args[0]
  return (function (self) {
    args[0] = self;
    constructor.apply(this, args);
    return self;
  })(base || Object.create(null))
}

module.exports = {
  1: Selfish$Variadic$1,
  2: Selfish$Variadic$2,
  3: Selfish$Variadic$3,
  any: Selfish$Variadic
}
