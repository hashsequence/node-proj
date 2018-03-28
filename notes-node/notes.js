console.log('starting notes.js');

console.log(module);

module.exports.age = 22;

module.exports.addNote = () => {
  console.log('addNote');
  return 'New Note';
};
module.exports.add = (a,b) =>  a + b;
