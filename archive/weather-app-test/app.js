const request = require('request');
const yargs = require('yargs');

const argv = yargs
.options({
  a : {
    demand : true,
    alias : 'address',
    describe : 'Address to fetch weather for',
    string : true //always parse argument as argument
  }
  }
)
.help()
.alias('help','h')
.argv;

request({
  url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(argv.address),
  json : true
},
(error, response, body) => {
  //console.log(JSON.stringify(body, undefined, 2));
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`latitude: ${body.results[0].geometry.location.lat} \nlongitude: ${body.results[0].geometry.location.lng}`)
  //console.log(JSON.stringify(response, undefined, 2));
});

//console.log(argv);
//console.log(argv._[0]);


/*
body is part of the http
hyper text transport protocol
the body is the return value of the http request from the server
*/
/*

body is part of response
response's properties'
Headers
body
request

*/
