var adminMethods = {};
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');
var mysql = require('mysql');

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

module.exports = adminMethods;