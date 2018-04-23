require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');
console.log('app started')

var spotify = new Spotify(keys.spotify);

var searchTerm = "for whom the bell tolls"


spotify.search({ type: 'track', query: searchTerm, count: 10 }, function(err, data) {
    for (var i = 0; i < 10; i++) {
        console.log("spotify input:", searchTerm);
        // console.log("_________________");
        console.log("-----------------");
        // console.log("Artist: ", data.tracks.items[i].album.artists[i].name);
        // console.log("_________________");
        console.log("Album: ", data.tracks.items[i].album.name);
        // console.log("_________________");
        console.log("Preview link: ", data.tracks.items[i].preview_url);
        // console.log("_________________");
        console.log("Song Name: ", data.tracks.items[i].name);
        console.log("_________________");
        console.log("*****************");
        
        if (err) {
            console.log('Error occurred: ' + err);
            searchTerm = "the+sign+ace+of+base";
            return;
        }
    };

});


