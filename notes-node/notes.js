console.log('starting notes.js');

//console.log(module);

//module.exports.age = 22;
var addNote = (title, body) => {
  console.log('adding note', title, body);
};

var getAll = () => {
  console.log('getting all notes');

};
//module.exports.add = (a,b) =>  a + b;

var getNote = (title) => {
  console.log('reading: ', title);
};

var removeNote = (title) => {
  console.log('removing Note: ',title);
}

module.exports = {
  addNote : addNote,
  getAll : getAll,
  getNote : getNote,
  removeNote : removeNote
};
