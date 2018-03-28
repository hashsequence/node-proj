console.log('Starting app.');

const fs = require('fs');
const os = require('os');

var user = os.userInfo();
console.log(user);


fs.appendFile('greetings.txt',`Hello ${user.username}!\n`, function(err) {
  if (err) {
    console.log('Error: Unable to load file');
  }
});
