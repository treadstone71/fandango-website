var adminMethods = {};
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');

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

module.exports = adminMethods;