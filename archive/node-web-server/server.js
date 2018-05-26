const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err)
    {
        console.log('Unable to append server.log');
    }
  });
    next();
});

/*
app.use((req, res, next) => {

  res.render('maintenance.hbs', {
    myTitle: 'Avery\'s Profile Maintenance Page',
    pageTitle: 'This page displ ays basic information about Avery from the Backup'
  });


});
*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/',(req, res) => {
  //res.send('<h1>hello Express</h1>');
  /*res.send({
      name: 'Avery',
      summary: ['male','5\'6\'\'']
  })
  */
  res.render('about.hbs', {
      myTitle: 'Avery\'s Profile',
    pageTitle: 'This page displays basic information about Avery'
    //currentYear : new Date().getFullYear()
  });
});


// /bad

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    myTitle: 'Avery\'s Profile about',
    pageTitle: 'This page displays basic information about Avery'
  });
});

app.get('/bad', (req, res) => {
  res.send({ErrorMsg : 'Error!'});
})

app.listen(3000, () => {
  console.log('Server is up on Port 3000');
});
