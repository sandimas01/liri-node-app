require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var userInput = process.argv[2];
var secondUserInput = process.argv[3];
for(i=4; i<process.argv.length; i++){
    secondUserInput += '+' + process.argv[i];
    }

    function appChoice(){
        if (userInput === undefined){
            console.log("Please type in: 'my-tweets', 'spotify-this-song'+'song name', 'movie-this'+'movie name', or 'do-what-it-says', to get started!");
            }

            else if (userInput === "do-what-it-says") {
                console.log("random.txt reader app started");
                randomApp()
            }

            else if (userInput === "my-tweets") {
                console.log('twitter app started');
                twitterApp()
            }

            else if (userInput === "spotify-this-song") {
                console.log('music search app started');
                spotifyApp()
            }

            else if (userInput === "movie-this") {
                console.log('movie search app started');
                movieApp()
            }
    }

    function twitterApp(){
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: keys.twitter.access_token_key,
            access_token_secret: keys.twitter.access_token_secret
        });
        
            var params = { screen_name: 'sandimas3d', count: 20 };
        
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    for (i = 0; i < 20; i++) {
        
                        console.log("\nTweet " + [i+1] + "\n" + tweets[i].text + "\nCreated at: " + tweets[i].created_at + "\n");
        
                        console.log("-------------------------------------------------");
                    }
                }
            });
    }

    function spotifyApp(){
        var searchSong;
        if(secondUserInput === undefined){
            searchSong = "Ace+of+Base+The+Sign";
        } else{
            searchSong = secondUserInput;
        }


        spotify.search({ type: 'track', query: searchSong, count: 10 }, function(err, data) {
            for (var i = 0; i < 10; i++) {
                console.log("Spotify search:", searchSong);
                console.log("-----------------");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Name: ", data.tracks.items[i].name);
                console.log("Preview link: ", data.tracks.items[i].preview_url);
                console.log("Album: ", data.tracks.items[i].album.name);
                console.log("_________________");
                console.log("*****************");
                
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }
            };
        
        });
    }

    function movieApp(){
        var searchMovie;
            if(secondUserInput === undefined){
                searchMovie = "Mr+Nobody";
            } else{
                searchMovie = secondUserInput;
            }

            var queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";


            request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
            });
        }

    function randomApp(){
        fs.readFile("random.txt", "utf8", function(error, data) {
            if(error){
                 console.log(error);
             } else {
                //  console.log(data);
        
                 var dataArr = data.split(',');
                 userInput = dataArr[0];
                 secondUserInput = dataArr[1];
                 for(i=2; i<dataArr.length; i++){
                     secondUserInput = secondUserInput + "+" + dataArr[i];
                    }
                    // console.log(userInput);
                    // console.log(secondUserInput);
                    appChoice()
                }
        });   
    }

appChoice()

    