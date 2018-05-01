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
		movies.find({ $or: [{ movie_id: value.data.movieid}, { movie_id: +value.data.movieid}] }).toArray(function(err, movieele){
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

userMethods.update_profile = function(value, done){
	console.log(value.data);
	let up = {
		firstname: value.data.body.firstname,
		lastname: value.data.body.lastname,
		address: value.data.body.address,
		city: value.data.body.city,
		state: value.data.body.state,
		zip: value.data.body.zip,
		phone: value.data.body.phone,
		email: value.data.body.email,
		creditcard: value.data.body.creditcard
	}
	let query = "UPDATE users SET firstname=" + mysql.escape(up.firstname) + ","
							+ "lastname="  + mysql.escape(up.lastname) + ","
							+ "address="  + mysql.escape(up.address) + ","
							+ "city="  + mysql.escape(up.city) + ","
							+ "state="  + mysql.escape(up.state) + ","
							+ "zip="  + mysql.escape(up.zip) + ","
							+ "phone="  + mysql.escape(up.phone) + ","
							+ "email="  + mysql.escape(up.email) + ","
							+ "creditcard="  + mysql.escape(up.creditcard) + " WHERE username=" + mysql.escape(value.data.username) + ";"
	getConnection(function(err, conn){
		conn.query(query, function(err, results){
			conn.release();
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", username: value.data.username}});
		});
	})
}

userMethods.get_user_info = function(value, done){
	var username = value.data.username;
	let query = "select * from users where username="+mysql.escape(username)+";";
	getConnection(function(err, conn){
		conn.query(query, function(err, results){
			conn.release();
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", user: results[0]}});
		});
	})
}

userMethods.bookticket = function(value, done){
	console.log(value.data);
	getMongodb(function(mongodb){
		let moviehall = mongodb.collection("moviehall");
		moviehall.find({ $or: [{ hall_id: value.data.body.hall_id}, { hall_id: +value.data.body.hall_id}] }).toArray(function(err, ele){
			console.log(ele);
			if(+ele[0].num_tickets >= +value.data.body.numTickets){
				let reqticts = +value.data.body.numTickets;
				let avtickts = +ele[0].num_tickets;
				moviehall.findOneAndUpdate({ $or: [{ hall_id: value.data.body.hall_id}, { hall_id: +value.data.body.hall_id}] },
					 {$set: {"num_tickets": avtickts - reqticts}}, function(err, doc){
					 	if(err) return console.log(err);
					 	let query = "select * from users where username = " + mysql.escape(value.data.username);
					 	getConnection(function(err, conn){
					 		conn.query(query, function(err, res){
					 			query = "INSERT INTO billing (amount, userid, movieid, moviehallid, numtickets) VALUES (" 
					 						+ mysql.escape(+value.data.body.price*reqticts) + ","
					 						+ mysql.escape(res[0].userid) + ","
					 						+ mysql.escape(value.data.body.movie_id) + ","
					 						+ mysql.escape(value.data.body.hall_id) + ","
					 						+ mysql.escape(reqticts) +
					 						");"
					 			conn.query(query, function(err, res){
					 				console.log(err, res);
					 				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS"}});
					 			})
					 		})
					 	})
					 })
			}
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE", msg:"NOTICKETS"}});
		})
	})
}

module.exports = userMethods;