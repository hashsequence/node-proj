const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.status(400).send({
    error : 'page not found',
    name : 'Todo App v1.0'
  });
});

app.get('/users', (req, res) => {
  res.status(200).send([{
    name : 'Avery',
    age : '90'
  },{
    name : 'Dylan',
    age : '50'
  }, {
    name : 'Pat',
    age : '60'
  }]);
});

app.listen(3000);
module.exports.app = app;
