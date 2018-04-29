var adminMethods = {};
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');
var mysql = require('mysql'); 
var cryptPassword = require('./crypto.js').cryptPassword;
var comparePassword = require('./crypto.js').comparePassword;

function getNextSequence(collection, name, cb){
	collection.findOneAndUpdate({ name }, { $inc : { value : 1}}, function(err, res){
		if(res)
			cb(res);
	});
}

adminMethods.revenue_movies = function(value, done) {
	let query = "select movieid, amount from billing";
	getConnection(function(err,conn){
		if(err){
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
		}

		conn.query(query, function(err, results){
			conn.release();
			if(err){
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			}
			// console.log(JSON.stringify(results));
			let moviesamount = {};
			for(var i in results){
				if(!moviesamount.hasOwnProperty(results[i].movieid)){
					moviesamount[results[i].movieid] = 0;
				}
				moviesamount[results[i].movieid] += +results[i].amount;
			}
			var sortable = [];
			for (var movieid in moviesamount) {
			    sortable.push([movieid, moviesamount[movieid]]);
			}

			sortable.sort(function(a, b) {
			    return -(a[1] - b[1]);
			});

			var sol = sortable.slice(0, 10);
			var ans = [];
			function populate(i, sol, movies, cb){
				if(i == sol.length)
					return cb();

				movies.find({ movie_id: +sol[i][0] }).toArray(function(err, ele){
					let m = [];
					m.push(ele[0].title);
					m.push(sol[i][1]);
					ans.push(m);
					populate(i+1, sol, movies, cb);
				});

			}
			getMongodb(function(mongodb){
				var movies = mongodb.collection("movies");
				populate(0, sol, movies, function(){
					return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", "sol": ans}});	
				});
			});
		});
	});
}

adminMethods.city_revenue = function(value, done){
	let movietitle = value.data.movie_title;
	getMongodb(function(mongodb){
		var movies = mongodb.collection("movies");
		// console.log(JSON.stringify({ title : movietitle}));
		movies.find({ title : movietitle}).toArray(function(err, ele){
			if(err || ele.length == 0){
				console.log("fail", ele);
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});	
			}
			let movie_id = ele[0].movie_id;
			let query = "select * from billing where movieid = " + mysql.escape(movie_id) + ";";
			getConnection(function(err,conn){
				if(err){
					return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
				}

				conn.query(query, function(err, results){
					// console.log(results);
					if(results.length == 0){
						return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
					}

					let revenueperuser = {};
					let userids = [];
					for(var i in results){
						if(!revenueperuser.hasOwnProperty(results[i].userid)){
							revenueperuser[results[i].userid] = 0;
							userids.push(results[i].userid);
						}
						revenueperuser[results[i].userid] += +results[i].amount;
					}

					let list = "";
					for(var i in userids){
						if(i==userids.length-1) break;
						list = list + userids[i] + ",";
					}
					let query = "";
					if(list === "")
						query = "select city, userid from users where userid in (" + mysql.escape(userids[userids.length-1]) + ");"
					else
						query = "select city, userid from users where userid in (" + list + userids[userids.length-1] + ");"
					// console.log("query: ", query);
					getConnection(function(err, conn){
						conn.query(query, function(err, results){
							// console.log("require: ", results);
							let ans = {};
							for(var i in results){
								if(!ans.hasOwnProperty(results[i].city)){
									ans[results[i].city] = 0;
								}
								ans[results[i].city] += revenueperuser[results[i].userid];
							}
							// console.log(ans);
							return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", ans }});
						});
					})
				});
			});
		});
	});
}

adminMethods.get_halls = function(value, done){
	let query = "select * from billing";
	getConnection(function(err, conn){
		conn.query(query, function(err, results){
			// console.log("require: ", results);
			let sol = {};
			for(var i in results){
				if(!sol.hasOwnProperty(results[i].moviehallid))
					sol[results[i].moviehallid] = 0;

				sol[results[i].moviehallid] += +results[i].numtickets;
			}

			var sortable = [];
			for (var moviehallid in sol) {
			    sortable.push([moviehallid, sol[moviehallid]]);
			}

			sortable.sort(function(a, b) {
			    return -(a[1] - b[1]);
			});

			sol = sortable.slice(0, 10);
			var ans = [];
			function populate(i, sol, moviehall, cb){
				if(i == sol.length)
					return cb();

				moviehall.find({ hall_id: +sol[i][0] }).toArray(function(err, ele){
					let m = [];
					m.push(ele[0].name);
					m.push(sol[i][1]);
					ans.push(m);
					populate(i+1, sol, moviehall, cb);
				});

			}
			getMongodb(function(mongodb){
				var moviehall = mongodb.collection("moviehall");
				populate(0, sol, moviehall, function(){
					return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", "sol": ans}});	
				});
			});
		});
	});
}

adminMethods.get_movie = function(value, done){
	console.log("inside req for get movie", value.data);
	let movietitle = value.data.movie_title;
	getMongodb(function(mongodb){
		var movies = mongodb.collection('movies');
		movies.find({ title: movietitle}).toArray(function(err, list){
			if(err){
                console.log("fail", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			}
			var movie = {
				"movie_id": list[0].movie_id,
				"title": list[0].title,
				"trailer": list[0].trailer,
				"characters": list[0].characters,
				"date": list[0].date,
				"movie_length": list[0].movie_length,
				"seeitin": list[0].seeitin
			}
            return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie }});
		})
	});
}

adminMethods.get_movie_info = function(value, done){
	console.log("inside req for get movie info ", value.data);
	let movieid = value.data.movie_id;
	getMongodb(function(mongodb){
		var movies = mongodb.collection('movies');
		movies.find({movie_id: +movieid}).toArray(function(err, list){
			if(err){
				console.log("fail", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			}
			var movie_info = {
                "movie_id": list[0].movie_id,
                "title": list[0].title,
                "trailer": list[0].trailer,
                "characters": list[0].characters,
                "date": list[0].date,
                "movie_length": list[0].movie_length,
                "seeitin": list[0].seeitin
			}
            return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie_info }});
		})
	});
}

adminMethods.update_movie_info = function(value, done) {
    console.log('inside update movie info', value.data);
    var data = value.data.body;
    var movieid = value.data.movie_id;
    getMongodb(function (mongodb) {
        var movies = mongodb.collection('movies');
        set = {
            title: value.data.body.title,
            trailer: value.data.body.trailer,
            movie_length: value.data.body.movie_length,
            date: value.data.body.date,
            characters: value.data.body.characters.split(",")
        }
        movies.findOneAndUpdate({movie_id: +movieid}, {"$set": set}, function (err, res) {
            console.log("res in update profile", arguments);
            if (err) {
                console.log("error in update movie info", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
            }
            console.log(res);
            return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS"}});
        });
    });
}

adminMethods.post_hall = function(value, done){
	var data = value.data;
	if(data.username == undefined || data.password == undefined || data.name == undefined || 
		data.movie_times == undefined || data.num_tickets == undefined || data.screen_number == undefined || data.ticket_price == undefined || 
		 data.movies == undefined)
		return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE", msg: "NOT_ENOUGH_INFO"}});

	getMongodb(function(mongodb){
		var counter = mongodb.collection('counters');
		let moviehall = mongodb.collection('moviehall');
		moviehall.find({ username: data.username }).toArray(function(err, ele){
			if(ele.length != 0 )
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE", msg: "USERNAME_EXISTS"}});

			getNextSequence(counter, 'hall_id', function(res){
				console.log("nect hallid: ", res.value.value);

				cryptPassword(data.password, function(err, hash){
					//update movie_times, movies
					let movie_times = data.movie_times.split(",");
					let movies = data.movies.split(",");
					let screen_number = [];
					for(var i=1; i<=+data.screen_number; i++)
						screen_number.push(i);
					for(var i in movies){
						if(isNaN(+movies[i]))
							return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
						movies[i] = +movies[i];
					}
					let moviehalldoc = {
						//username, password, hall_id, name, movie_times, num_tickets, screen_number, ticket_price, movies
						username: data.username,
						password: hash,
						hall_id: res.value.value,
						name: data.name,
						movie_times: movie_times,//format
						num_tickets: data.num_tickets,
						screen_number: screen_number,
						ticket_price: data.ticket_price,
						movies: movies//format
					}

					moviehall.insertOne(moviehalldoc, function(err, res){
						if(err)
							return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
						if(res.result.ok == 1)
							return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", hall_id: moviehalldoc.hall_id}});
					})
				});
			});
		});
	});
}

adminMethods.get_movie_hall = function(value, done){
	console.log("inside req for get movie hall", value.data);
	let name = value.data.name;
	getMongodb(function(mongodb){
		var moviehall = mongodb.collection('moviehall');
		moviehall.find({name : name}).toArray(function(err, list){
			if(err){
				console.log('error in movie hall', err);
			}
			var name = {
				"hall_id":list[0].hall_id,
				"username":list[0].username,
				"password":list[0].password,
				"name":list[0].name,
				"num_tickets":list[0].num_tickets,
			}
            return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", name }});
		})
	});
}

adminMethods.get_movie_hall_info = function(value, done){
	console.log("inside req for get hall info", value.data);
	let hallid = value.data.hall_id;
	getMongodb(function(mongodb){
		var moviehall = mongodb.collection('moviehall');
		moviehall.find({ hall_id: +hallid }).toArray(function(err, list){
			if(err){
				console.log("error", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			}
			var hall_info = {
				'hall_id': list[0].hall_id,
				'username': list[0].username,
				'password':list[0].password,
				'name':list[0].name,
				'movie_times': list[0].movie_times,
				'num_tickets': list[0].num_tickets,
				'screen_number': list[0].screen_number,
				'ticket_price': list[0].ticket_price,
				'movies': list[0].movies
			}
            	return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", hall_info }});
		})
	});
}

adminMethods.update_movie_hall_info = function(value, done){
    console.log('inside update movie hall info', value.data);
    var data = value.data.body;
    var hallid = value.data.hall_id;
    getMongodb(function(mongodb){
        var moviehall = mongodb.collection('moviehall');
        set = {
        	username: value.data.body.username,
			name: value.data.body.name,
			movie_times: value.data.body.movie_times,
			num_tickets: value.data.body.num_tickets,
			screen_number: value.data.body.screen_number,
			ticket_price: value.data.body.ticket_price,
			movies: value.data.body.movies
		}
		moviehall.findOneAndUpdate({hall_id: +hallid }, {"$set": set}, function(err, res){
            console.log("res in update hall", arguments);
            if (err) {
                console.log("error in update movie info", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
            }
            console.log(res);
            return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS"}});
		});
	});
}

module.exports = adminMethods;