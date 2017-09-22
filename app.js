var keys = require('./keys.js');
var fs = require('fs');
var action = process.argv[2];
var nodeArgs = process.argv;

var value = "";

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    value = value + "+" + nodeArgs[i];
  }
  else {
    value += nodeArgs[i];
  }
}

switch(action){
    case "spotify-this-song":
        spotifySearch(value);
        break;
    case "movie-this":
        movieSearch(value);
        break;
    case "my-tweets":
        twitterSearch(value);
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
        return;
}


function spotifySearch(song){
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: '0f4fbeebd47445ce90380c0a89e7e066',
        secret: 'cff3310c9ae14eb88b110e50251c78dc'
    });

    spotify.search({ type: 'track', query: song }, function(err, data){
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let trackURL = data.tracks.items[0].album.external_urls.spotify;
        let artist = data.tracks.items[0].artists[0].name
        console.log(trackURL);
        console.log(artist);

        fs.appendFile('log.txt',"{"+ trackURL + " by " + artist+"},", function(err){
            if(err){
                console.log(err);
            }
            console.log("Added new entry to log");
        });
    });
}

function movieSearch(movie){

    var request = require('request');

    if(!movie){
        console.log('If you have nott watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/');
        console.log('It is on Netflix!');
        return;
    }

    request('http://www.omdbapi.com/?apikey=40e9cece&t='+movie, { json: true}, function (error, response, data) {

        if(error){
            console.log(error);
        }

        console.log(data.Title);
        console.log("Release Year: "+data.Year);
        console.log("IMDB: "+ data.imdbRating);
        console.log(data.Ratings[1].Source + ": " + data.Ratings[1].Value);
        console.log("Country: " + data.Country);
        console.log("Language(s): " + data.Language);
        console.log("Synopis: " + data.Plot);
        console.log("Starring: " + data.Actors);
    });
}

function twitterSearch(handle){

    var twitter = require('twitter');
    var client = new twitter(keys);
    let screenName = {screen_name : handle };

    client.get('statuses/user_timeline', screenName, function(error, tweets, reponse){

        if(error){
            console.log(error);
        }

            let user = screenName.screen_name;

            console.log("####################");
            console.log("Recent tweets from " + user);
            console.log("####################");

            for(var i = 0; i<tweets.length; i++){
                console.log("|-----------------|");
                console.log(tweets[i].text);
            }
    });
}

function doIt(){

    fs.readFile('random.txt', 'utf8', function(err, data){
        if(err){
            console.log(err);
        }

        let command = data.split(',');
        action = command[0];
        value = command[1];

        switch(action){
            case "spotify-this-song":
                spotifySearch(value);
                break;
            case "movie-this":
                movieSearch(value);
                break;
            case "my-tweets":
                twitterSearch();
                break;
            default:
                console.log("Error");
                break;
            }
    });
}
