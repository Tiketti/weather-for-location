var request = require('request');
var Promise = require('bluebird');

var latitude = '';
var longitude = '';

var api_key = '2e60a4d3571ff11bc79f09c06478a14b';

getLocationByIP()
  .then(getWeatherByLatLong)
  .catch(function(e) {
    console.log('error getting location');
  });

function getLocationByIP() {

  return new Promise(function(resolve, reject) {
    request('http://freegeoip.net/json/', function (error, response, body) {
        if(error){
          reject(error);
        } else {
          if(response.statusCode == 200) {
            var json = JSON.parse(body);
            console.log("hello %s, tell me how you doin'", json.city);
            resolve ( { lat: json.latitude, long: json.longitude } );
          } else {
            reject('server didn\'t respond in a timely manner' );
          }
        }

      });

    });
}

function getWeatherByLatLong(coords) {
  var forecastEndpoint = 'https://api.forecast.io/forecast/' + api_key + '/' + coords.lat + ', ' + coords.long + '?units=si';
  request(forecastEndpoint, function(error, response, body) {

    if(error) {
      console.log(error);
      return;
    }
    var json = JSON.parse(body);
    console.log("temperature is currently %s °C", json.currently.temperature);
  });

}
