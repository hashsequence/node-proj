console.log('Starting app.js.');

const fs = require('fs');
//const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');

/*
var user = os.userInfo();
var res = notes.addNote();

console.log(res);
console.log(user);


fs.appendFile('greetings.txt',`Hello ${user.username} You are ${notes.age}!\n`, function(err) {
  if (err) {
    console.log('Error: Unable to load file');
  }
});

var a = 4, b = 7;

console.log(`this is the sum of ${a} and ${b}: ${notes.add(a,b)}`);
console.log(_.isString(true));
console.log(_.isString('Avery'));
*/
/*
var filteredArray = _.uniq(['Avery', 1, 'Avery', 2, 3, 4]);
var testArr1 = [...filteredArray, 'bob', 32];
console.log(filteredArray);
console.log(testArr1);
*/

/*
getting user input and output
----------------------------------
*/

//var command = process.argv[2];
/*
aargument parsing using yargs
*/

const argv = yargs.argv;
const command = argv._[0];
console.log(argv);
console.log(process.argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
  //console.log('listing all notes');
  notes.getAll();
} else if (command === 'read'){
  //console.log('reading note');
  notes.getNote(argv.title);
}else if(command === 'remove') {
  //console.log('removing note');
  notes.removeNote(argv.title);
} else {
  console.log("command doesn't exits");
}
