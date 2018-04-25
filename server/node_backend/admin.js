var adminMethods = {};
var getConnection = require('./database/mysql');

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
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", sol: sortable.slice(0, 10)}});
		});
	});
}

module.exports = adminMethods;