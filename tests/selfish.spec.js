var Selfish = require('..')

describe('Selfish#simple', function () {

  var test, s

  function setup (self) {
    self.a = 'a'
    self.b = 'b'
    self.c = self.a + self.b
  }

  beforeEach(function () {
    test = Object.create(null)
    setup(test)
    s    = Selfish.simple(setup)
  })

  it('Creates a nice little object', function () {
    expect(s).toEqual(test)
  })

  it('Can have different bases', function () {
    function addFn (self) {
      self.d = function (d) {
        return self.c + self.d
      }
    }

    s = Selfish.simple(addFn, s)
    addFn(test)

    expect(s.d('d')).toEqual(test.d('d'))
  })

})

describe('Selfish#variadic', function () {

  function setup (self, a, b, c) {
    self.a = a
    self.b = b
    self.c = c
  }

  var variadicArr, test

  beforeEach(function () {
    variadicArr = [ setup, 'a', 2, false]

    test = Object.create(null)
    setup(test, 'a', 2, false)
  })

  it('Accepts arguments and passes them on', function () {
    expect(Selfish.variadic.any(variadicArr)).toEqual(test)
  })

  it('Can have different bases', function () {
    var base = function () { return function (b) {
      return Selfish.simple(function (self) {
        self.a = b
      })
    }}

    var baseTest = base()

    setup(baseTest, 'a', 2, false)

    var sb = Selfish.variadic.any(variadicArr, base())

    expect(Object.keys(sb)).toEqual(Object.keys(baseTest))
    expect(sb(217)).toEqual(baseTest(217))
  })

})
