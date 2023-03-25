/*
Summary. 
call : binds the this value, invokes the function, and allows you to pass a list of arguments. 
apply : binds the this value, invokes the function, and allows you to pass arguments as an array. 
bind : binds the this value, returns a new function, and allows you to pass in a list of arguments.
*/

function Parent (parentName) {
  this.a = "i am parent"
  this.parentName = parentName + "'s Father'"
}

Parent.prototype.Discipline = function(childName = "somechild") {
  console.log(this.a +", " + this.parentName + ": bad kid!!!! " + childName)
}

function Children(name) {
  this.b = "I am child"
  this.name = name
  Parent.call(this, name)
  Object.setPrototypeOf(Children.prototype, Parent.prototype)
}


Children.prototype.GoCrazy = function() {
  console.log("I am a kid going crazy!!!!!!!")
  this.Discipline("boyoooo");
  //Parent.prototype.Discipline.call(this,"boy");
}

let p = new Parent("father")
let c = new Children("son")

console.log(c.a)
console.log(c.b)
console.log(c.name)
console.log(c.parentName)
c.Discipline()
console.log("--------------------")
//change this into instance of c, JUST doing this to demonstrate
Children.prototype.Discipline = Parent.prototype.Discipline.bind(c)
c.GoCrazy()

/*
OUTPUT:
> "i am parent"
> "I am child"
> "son"
> "son's Father'"
> "i am parent, son's Father': bad kid!!!! somechild"
> "--------------------"
> "I am a kid going crazy!!!!!!!"
> "i am parent, son's Father': bad kid!!!! boyoooo"
*/
