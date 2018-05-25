const yargs = require('yargs');
const geocode = require('./geocode/geocode');
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

geocode.getWeatherInfo(argv.address);
geocode.asyncGetWeatherInfo(argv.address);
geocode.axiosGetWeatherInfo(argv.address);


/*********************************************notes********************************///
//learned how to use callbacks and asynchronous nature of node

/*
dark sky forecast API
key : 5f6bbd27b86b05d69bfffa430c42db4b
*/

/*
https://api.darksky.net/forecast/5f6bbd27b86b05d69bfffa430c42db4b/LATITUDE,LONGITUDE
*/

//console.log(argv);
//console.log(argv._[0]);
/*
var encodedAddress = encodeURIComponent(argv.address)
request({
  url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
  json : true
},
(error, response, body) => {
  //error checking
if (error) {
    console.log('unable to connect to Google Servers');
} else if (body.status === 'ZERO_RESULTS') {
  console.log('Request Failed: Unable to find address');
} else if (body.status === 'OK') {
  //console.log(JSON.stringify(body, undefined, 2));
  console.log(`Address: ${body.results[0].formatted_address}\nlatitude: ${body.results[0].geometry.location.lat} \nlongitude: ${body.results[0].geometry.location.lng}`);
  //console.log(JSON.stringify(response, undefined, 2));
}
});
*/


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
