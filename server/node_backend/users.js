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

userMethods.get_movie_info = function(value, done){
	getMongodb(function(mongodb){
		var movies = mongodb.collection("movies");
		movies.find({movie_id: +value.data.movieid}).toArray(function(err, movieele){
			if(movieele.length == 0)
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			var moviehall = mongodb.collection("moviehall");
			moviehall.find({ $or: [{ movies: value.data.movieid}, { movies: +value.data.movieid}] }).toArray(function(err, hallele){
				let ans = movieele[0];
				ans.halls = [];
				for(var i in hallele){
					ans.halls.push({
						hall_id: hallele[i].hall_id,
						name: hallele[i].name,
						ticket_price: hallele[i].ticket_price
					});
				}
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie: ans}});
			});
		});
	});
}

userMethods.bookticket = function(value, done){
	console.log(value.data);
	//need sessions to finish this
}

module.exports = userMethods;