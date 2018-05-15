console.log('starting notes.js');

//console.log(module);
const fs = require('fs');
//module.exports.age = 22;
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e) {
    return [];
  }

}
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
//  console.log('adding note', title, body);

  var notes = fetchNotes();
  var note = {
    title : title
    , body : body
  }
  var duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }else {
    console.log("duplicate notes");
  }
  return undefined;



};

var getAll = () => {
  console.log('getting all notes');
  return fetchNotes();
};
//module.exports.add = (a,b) =>  a + b;

var getNote = (title) => {
  console.log('reading: ', title);
  var notesArr = fetchNotes();
  filterednotesArr = notesArr.filter((item) => title === item.title);
  if(filterednotesArr.length === 1) {
    return filterednotesArr[0];
  } else {
    return undefined;
  }
};

var removeNote = (title) => {
  console.log('removing:' + title);
  var notesArr = fetchNotes();
  console.log(JSON.stringify(notesArr));
  filterednotesArr = notesArr.filter((item) => {
    console.log(title + ' ' + item.title);
    return title !== item.title;
  });
  console.log(JSON.stringify(filterednotesArr));
    saveNotes(filterednotesArr);
    return notesArr.length !== filterednotesArr.length;
}

var logNote = (note) => {
  return `title: ${note.title} body: ${note.body}\n`
}
module.exports = {
  addNote : addNote,
  getAll : getAll,
  getNote : getNote,
  removeNote : removeNote,
  logNote : logNote
};
