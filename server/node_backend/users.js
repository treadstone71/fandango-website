var userMethods = {};
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');
var mysql = require('mysql'); 
var bcrypt = require('bcrypt');

userMethods.register_user = function(value, done){
	console.log("inside req for adding user", value.data);
	let query = "INSERT INTO users (userid, username, password) VALUES (?, ?, ?)";
	let query_last_id = "SELECT userid FROM users ORDER BY userid DESC LIMIT 1";
	//ecrypt password
	let pwd = bcrypt.hashSync(value.data.password, 10);

	//DB insert user record
	getConnection(function(err,conn){
		if(err){
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
		};

		let userid = -1;

		conn.query(query_last_id, function(err, results){
			// conn.release();

			if (err) {
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			}
			
			userid = results[0].userid + 1;
			console.log("User id:" + userid);

			conn.query(query, [userid, value.data.username, pwd], function(err, results){
				conn.release();
				if (err) {
					console.log("Insert error");
					return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
				}
				console.log("Number of records inserted: " + results.affectedRows);
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", method: "REGISTER"}});
			});
		});

	});
	
}

module.exports = userMethods;