console.log('Starting app.js.');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');


var user = os.userInfo();
var res = notes.addNote();

console.log(res);
console.log(user);

/*
fs.appendFile('greetings.txt',`Hello ${user.username} You are ${notes.age}!\n`, function(err) {
  if (err) {
    console.log('Error: Unable to load file');
  }
});
*/
var a = 4, b = 7;

console.log(`this is the sum of ${a} and ${b}: ${notes.add(a,b)}`);
console.log(_.isString(true));
console.log(_.isString('Avery'));

var filteredArray = _.uniq(['Avery', 1, 'Avery', 2, 3, 4]);

console.log(filteredArray);
