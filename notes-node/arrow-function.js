var square = x => x * x;
//or you can use {var result = x * x; return result}
//you dont need parenthesis if you have one argument
console.log(square(3));

//remember when using this in anonymous function this refers to outer scope
var user = {
  name : 'Avery',
  sayHi: () => {
    console.log(arguments);
    console.log(`Hi Im ${this.name}`);
  },
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi Im ${this.name}`);
  }
};

user.sayHi();
user.sayHiAlt(); //this works when we use regular functions
user.sayHiAlt(1,2,3);
user.sayHi(1,2,3); //gives you the global argument variables
