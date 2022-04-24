import { Unsplash_apikey } from "@env";

var rootURL = 'https://api.unsplash.com/search/photos?';
var apikey = Unsplash_apikey;

export default function(query) {
  var url = `${rootURL}page=1&query=${query}&order_by=relevant&orientation=landscape&client_id=${apikey}`;
  return fetch (url).then(function(response){
    return response.text();
  }).then(function(text){
    // console.log(text);
    let json = JSON.parse(text);
    // console.log(json);
    return json;
  })
}