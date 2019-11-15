//destructuring : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//context vs scope : https://codeburst.io/understanding-that-and-bind-8778f779b149
//new : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
//let vs var : https://codeburst.io/difference-between-let-and-var-in-javascript-537410b2d707
//of vs in : https://alligator.io/js/for-of-for-in-loops/

class GuitarAmp {
  constructor ({ cabinet = 'spruce', distortion = '1', volume = '0' } = {}) {
    Object.assign(this, {
      cabinet, distortion, volume
    });
  }
}

class BassAmp extends GuitarAmp {
  constructor (options = {}) {
    super(options);
    this.lowCut = options.lowCut;
  }
}

class ChannelStrip extends BassAmp {
  constructor (options = {}) {
    super(options);
    this.inputLevel = options.inputLevel;
  }
}


/////////////////////////////////////////////////////////////////////
function c () {
  this.illist = "feqwgqfw"
}

function t (a,b) {
  this.a1 = a
  this.a2 = b
}

t.prototype = new c()


let t1 = new t("tewt","twetw")
let t2 = new t("tewt235325","twetw235")
console.log(t1)
console.log(t2)

c.prototype.iuop = "c iuop"
t.prototype.iuop = "t iuop"
t.prototype.temp = "aaaaa"

console.log(Object.keys(t1))
console.log(Object.keys(t2))
console.log(t1.temp)
console.log(t2.temp)
console.log('---------')

for (let o = t1; o != Object.prototype; o = Object.getPrototypeOf(o)) {
  console.log(Object.getOwnPropertyNames(o))
  for (let name of Object.getOwnPropertyNames(o)) {
    console.log(o[name])
  }
}

t1.iuop = "changed iuop for t1"
t1.illest = 534675837427
console.log('---------')
for (let o = t2; o != Object.prototype; o = Object.getPrototypeOf(o)) {
  console.log(Object.getOwnPropertyNames(o))
  for (let name of Object.getOwnPropertyNames(o)) {
    console.log(o[name])
  }
}

console.log('---------')
for (let o = t1; o != Object.prototype; o = Object.getPrototypeOf(o)) {
  console.log(Object.getOwnPropertyNames(o))
  for (let name of Object.getOwnPropertyNames(o)) {
    console.log(o[name])
  }
}
console.log('---------')

console.log(Object.getPrototypeOf(Object.getPrototypeOf(t1)).iuop)
console.log(Object.getPrototypeOf(t1).iuop)
console.log(t1.iuop)
console.log(t2.iuop)
