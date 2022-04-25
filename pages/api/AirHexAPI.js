var rootURL = 'https://content.airhex.com/api/v3.7.3/airlines/?'

export default function(type, code) {
  var url = `${rootURL}${type}=${code}`;
  return fetch (url).then(function(response){
    return response.text();
  }).then(function(text){
    // console.log(text);
    let json = JSON.parse(text);
    // console.log(json);
    return json;
  })
}