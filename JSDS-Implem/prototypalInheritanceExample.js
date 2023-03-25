function Parent (parentName) {
  this.a = "i am parent"
  this.parentName = parentName + "'s Father'"
}

Parent.prototype.Discipline = function(childName = "somechild") {
  console.log("bad kid!!!! " + childName)
}

function Children(name) {
  this.b = "I am child"
  this.name = name
  Parent.call(this, name)
}
Object.setPrototypeOf(Children.prototype, Parent.prototype)

Children.prototype.GoCrazy = function() {
  console.log("I am a kid going crazy!!!!!!!")
  Parent.prototype.Discipline.call(this,"boy");
}

let p = new Parent("father")
let c = new Children("son")

console.log(c.a)
console.log(c.b)
console.log(c.name)
console.log(c.parentName)
c.Discipline()
c.GoCrazy()
