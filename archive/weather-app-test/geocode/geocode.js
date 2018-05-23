const request = require('request');
const FORCAST_KEY = '5f6bbd27b86b05d69bfffa430c42db4b';
/*********************************
 Using Callbacks
 ********************************/
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
      callback(undefined,Object.assign({version : 'callback version'}, geoinfo, JSON.parse(body).currently));
      }
    });
  } else{
    callback("Error: Cannot get weather data!");
  }
};

var getWeatherInfo = (address) =>
{
  geoAddress(address, (errorMessage, geoinfo) =>
  {
    if (errorMessage)
    {
      console.log(errorMessage);
    } else {
       getWeather(geoinfo, (errorMessage, results) =>
     {
       if (errorMessage)
       {
         console.log(errorMessage);
       } else {
         console.log(JSON.stringify(results, undefined, 2));
       }
     });
    }
  });
};
/*********************************
 Using Promises
 ********************************/

var asyncGeoAddress = (address) => {
  return new Promise((resolve, reject) => {
  var encodedAddress = encodeURIComponent(address)
  request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
    json : true
  },
  (error, response, body) => {
    //error checking
      if (error) {
        reject('unable to connect to Google Servers');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Request Failed: Unable to find address');
      } else if (body.status === 'OK') {
        resolve({
          address : body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
    }
  });
});
};

var asyncGetWeather = (geoinfo) => {
  return new Promise((resolve, reject) => {
    if (geoinfo)
    {
      request({
        url: `https://api.darksky.net/forecast/${FORCAST_KEY}/${geoinfo.latitude},${geoinfo.longitude}`,
        JSON: true
      },
      (error, response, body) => {
      // resolve(new Promise((resolve,reject) => {
          if(error || response.statusCode !== 200) {
            reject('Error: unable to fetch weather data')
          }else {
          resolve(Object.assign({version : 'async version'}, geoinfo, JSON.parse(body).currently));
          }
      //  }));
      });
    } else{
      reject("Error: Cannot get weather data!");
    }
  })
};

var asyncGetWeatherInfo = (address) =>
{
  asyncGeoAddress(address).then((res) => {
    return asyncGetWeather(res);
  }, (errorMessage) => {
    return new Promise((resolve, reject) => {
        reject(errorMessage);
    });
  }).then((res) =>
    {
      console.log(JSON.stringify(res, undefined, 2));
    },(errorMessage) => {
      console.log(errorMessage);
    });
};




module.exports = {
  geocodeAddress : geoAddress,
  getWeatherInfo : getWeatherInfo,
  asyncGetWeatherInfo : asyncGetWeatherInfo
};
