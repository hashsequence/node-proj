/*
var obj = {
  name : 'Avery',
  age : 22
};

var stringObj = JSON.stringify(obj);
console.log(typeof stringObj);
console.log(stringObj);

var personString = '{"name":"Avery","age":22}';
console.log(personString);
var person = JSON.parse(personString);
console.log(typeof person);
console.log(person);
*/
const fs = require('fs');

var originalNote = {
  title : 'Some Title',
  body : 'Some Body',
  conclusion : 'Some Conclusion'
}
//originalNoteString
var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json',originalNoteString);
var noteString = fs.readFileSync('notes.json');
//note
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
