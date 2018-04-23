require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
// console.log(spotify);
// console.log(client);

var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});

// var client = new Twitter({
//     consumer_key: "IWts7bwBhFNM9qnYtE7ZkhHD1",
//     consumer_secret: "Q61urvGOj4Ifqq8ECBsqAcZJnvCxTVXUFB7hISVQkX1KLlmFug",
//     access_token_key: "233082682-8dssfVg1tEe9HYYOOdIiicHTqubsGZKUSGZJ62lr",
//     access_token_secret: "jFEnv5hg7YjAcjP9HrAWQOCg6aNQRjXjxsiZn40HXPicQ"
// });

// if (appName == "my-tweets") {
    var params = { screen_name: 'sandimas3d', count: 20 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < 20; i++) {

                console.log("\nTweet " + [i+1] + "\n" + tweets[i].text + "\nCreated at: " + tweets[i].created_at + "\n");

                console.log("-------------------------------------------------");
            }
        }
    });
// }
