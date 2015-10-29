var Selfish$Simple = function (constructor, base) {
  return (function (self) {
    constructor(self);
    return self;
  })(base || Object.create(null))
}

module.exports = Selfish$Simple;
