import { OpenWeatherMap_apikey } from "@env";

var rootURL = 'http://api.openweathermap.org/geo/1.0/reverse?';
var apikey = OpenWeatherMap_apikey;

export default function(lat, lon) {
  var url = `${rootURL}lat=${lat}&lon=${lon}&limit=1&appid=${apikey}`;
  return fetch (url).then(function(response){
    return response.text();
  }).then(function(text){
    // console.log(text);
    let json = JSON.parse(text);
    // console.log(json);
    return json;
  })
}