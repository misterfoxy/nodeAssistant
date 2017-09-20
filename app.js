var keys = require('./keys.js');


var action = process.argv[2];
var value = process.argv[3];

switch(action){
    case "spotify-this-song":
        spotifySearch();
        break;
    case "movie-this":
        movieSearch();
    case "my-tweets":
        twitterSearch();
        break;
    default:
        return;
}


function spotifySearch(){
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
        id: '0f4fbeebd47445ce90380c0a89e7e066',
        secret: 'cff3310c9ae14eb88b110e50251c78dc'
    });
 
    spotify.search({ type: 'track', query: value }, function(err, data){
        if (err) {
            return console.log('Error occurred: ' + err);
        }
 

        console.log(data.tracks.items[0].album.external_urls.spotify);
        console.log(data.tracks.items[0].artists[0].name);
});
}

function movieSearch(){
    
    var request = require('request');
    
    request('http://www.omdbapi.com/?apikey=40e9cece&t='+value, { json: true}, function (error, response, data) {
        
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

function twitterSearch(){
    
    var twitter = require('twitter');
    
    var client = new twitter(keys);
    
    let screenName = {screen_name : 'michaelfox69' };
    
    client.get('statuses/user_timeline', screenName, function(error, tweets, reponse){
        
        if(error){
            console.log(error);
        } 
        else{
            
            for(var i = 0; i<tweets.length; i++){
                console.log("|-----------------|");
                console.log(tweets[i].text);
                
            }
            
        }
    });
}
    

