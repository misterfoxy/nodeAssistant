var keys = require('./keys.js');
const twitter = require('twitter');


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '0f4fbeebd47445ce90380c0a89e7e066',
  secret: 'cff3310c9ae14eb88b110e50251c78dc'
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items[0]); 
});