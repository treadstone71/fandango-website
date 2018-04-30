var userMethods = {};
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');
var mysql = require('mysql'); 
var bcrypt = require('bcrypt');

userMethods.get_movie_category = function(value, done){
	getMongodb(function(mongodb){
		var movies = mongodb.collection("movies");
		movies.find({ categories : value.data.category }).toArray(function(err, ele){
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie: ele}});
		});
	});
}

userMethods.get_movie = function(value, done){
	getMongodb(function(mongodb){
		var movies = mongodb.collection("movies");
		movies.find({ title : value.data.moviename }).toArray(function(err, ele){
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie: ele}});
		});
	});
}

userMethods.get_movie_hall = function(value, done){
	getMongodb(function(mongodb){
		var moviehall = mongodb.collection("moviehall");
		moviehall.find({ name : value.data.hallname }).toArray(function(err, ele){
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", hall: ele[0]}});
		});
	});
}

module.exports = userMethods;