const request = require('request');

request({
  url : 'https://maps.googleapis.com/maps/api/geocode/json?address=442%20madrid%20st.%20san%20francisco',
  json : true
},
(error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`latitude: ${body.results[0].geometry.location.lat} \nlongitude: ${body.results[0].geometry.location.lng}`)
});

/*
body is part of the http
hyper text transport protocol
the body is the return value of the http request from the server
*/
