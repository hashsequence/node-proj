console.log('Starting app.js.');

const fs = require('fs');
//const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');
const Bst = require('./bst.js');
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
/*
var bst1 = new Bst.Bst();
bst1.put(3, 3);
bst1.put(5,5);=
bst1.put(7,7);
bst1.put(1,1);
bst1.put(8,8);
bst1.put(9,222);
bst1.put(11,11);
bst1.put(2,2);
console.log(bst1.getObjects(bst1.inOrderTraversal()));
*/

var titleOptions = {
  describe : 'Title of note', //description of title option
  demand : true,//requires the option --title
  alias : 't' //allows for -t instead
};
const argv = yargs.command('add','add a new note',
{title : titleOptions,
  body: {
    describe : 'body of the note',
    demand : true,
    alias : 'b'
  }
}).command('list', 'List all notes')
.command('read', 'Read a note', {title: titleOptions})
.help()
.argv;
const command = argv._[0];
console.log(argv);
console.log(process.argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if(note !== undefined) {
    console.log(`return note: ${JSON.stringify(note)} or title: ${note.title}, body: ${note.body}`);
  }
  else {
    console.log('Error: Unable to add note');
  }
} else if (command === 'list') {
  console.log('listing all notes');

  var notesArr = notes.getAll();
  var notesStr ="\noutput\n------------------\n";
  notesArr.forEach((ele) => {notesStr += notes.logNote(ele);});
  console.log(notesStr);

} else if (command === 'read'){
  //console.log('reading note');
  var value = notes.getNote(argv.title);
  if (value === undefined) {
    console.log('title not found');
  } else {
    console.log(notes.logNote(value));
  }

}else if(command === 'remove') {
  //console.log('removing note');
  var notesRemoved = notes.removeNote(argv.title);
  var message = notesRemoved ? 'Note was removed' : 'note not found'
  console.log(message);

} else {
  console.log("command doesn't exits");
}
