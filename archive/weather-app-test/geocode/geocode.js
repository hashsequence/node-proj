const request = require('request');
const axios = require('axios');

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
      callback(undefined,Object.assign({version : 'callback'}, geoinfo, JSON.parse(body).currently));
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
         console.log(JSON.stringify(results, undefined, 2).replace(/\{|\}|\"|\,/gi, ""));
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
          resolve(Object.assign({version : 'async'}, geoinfo, JSON.parse(body).currently));
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
      console.log(JSON.stringify(res, undefined, 2).replace(/\{|\}|\"|\,/gi, ""));
    },(errorMessage) => {
      console.log(errorMessage);
    });
};


/******************using axios******************************/
var axiosGetWeatherInfo = (address) => {
  var axiosEncodedAddress = encodeURIComponent(address);
  var axiosGeocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + axiosEncodedAddress;
  var axiosGeoInfo = {};
  axios.get(axiosGeocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }

      axiosGeoInfo['address'] = response.data.results[0].formatted_address;
      axiosGeoInfo['latitude'] = response.data.results[0].geometry.location.lat;
      axiosGeoInfo['longitude'] = response.data.results[0].geometry.location.lng;


    var axiosWeatherUrl =  `https://api.darksky.net/forecast/${FORCAST_KEY}/${axiosGeoInfo.latitude},${axiosGeoInfo.longitude}`;
    return axios.get(axiosWeatherUrl);
  }).then((response) => {
    var axiosWeatherInfo = response.data.currently;
    console.log(JSON.stringify(Object.assign({version : 'axios'}, axiosGeoInfo,axiosWeatherInfo), undefined, 2).replace(/\{|\}|\"|\,/gi, ""));
  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(e.message);
    }

  });

};


module.exports = {
  geocodeAddress : geoAddress,
  getWeatherInfo : getWeatherInfo,
  asyncGetWeatherInfo : asyncGetWeatherInfo,
  axiosGetWeatherInfo : axiosGetWeatherInfo
};
