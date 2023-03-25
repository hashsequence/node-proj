class Base {
  constructor(a = "default a") {
    this.a = a
    this.BaseMethod =this.BaseMethod.bind(this)
  }

  BaseMethod() {
    console.log(this.a + ": " + "base BaseMethod")
  }
}

class Derived extends Base {
  constructor(b = "default b") {
    super(b + "'s father")
  	this.b = b
  	this.DerivedMethod = this.DerivedMethod.bind(this)
  }

  DerivedMethod() {
    console.log(this.b + " : " + " derived DerivedMethod")
  }
}

let base = new Base("father")
base.BaseMethod()

let derived = new Derived("son")
derived.DerivedMethod()
derived.BaseMethod()

/*
Output:
> "father: base BaseMethod"
> "son :  derived DerivedMethod"
> "son's father: base BaseMethod"
*/
