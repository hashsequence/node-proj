const request = require('request');
const FORCAST_KEY = '5f6bbd27b86b05d69bfffa430c42db4b';

var geoAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address)
  request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
    json : true
  },
  (error, response, body) => {
    //error checking
  if (error) {
    callback('unable to connect to Google Servers');
  } else if (body.status === 'ZERO_RESULTS') {
    callback('Request Failed: Unable to find address');
  } else if (body.status === 'OK') {
    callback(undefined, {
      address : body.results[0].formatted_address,
      latitude: body.results[0].geometry.location.lat,
      longitude: body.results[0].geometry.location.lng
    });
    //console.log(JSON.stringify(body, undefined, 2));
    //console.log(JSON.stringify(response, undefined, 2));
  }
});
};

var getWeather = (geoinfo, callback) => {
  if (geoinfo)
  {
    request({
      url: `https://api.darksky.net/forecast/${FORCAST_KEY}/${geoinfo.latitude},${geoinfo.longitude}`,
      JSON: true
    },
    (error, response, body) => {
      if(error || response.statusCode !== 200) {
        callback('Error: unable to fetch weather data')
      }else {
      callback(undefined, JSON.parse(body).currently);
    }
    });
  } else{
    callback("Error: Cannot get weather data!");
  }
};



module.exports = {
  geocodeAddress : geoAddress,
  getWeather : getWeather
};
