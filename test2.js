require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');