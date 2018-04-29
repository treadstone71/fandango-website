var userMethods = {};
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');
var mysql = require('mysql'); 
var bcrypt = require('bcrypt');

function genUserId(){
	//get last of user record from mysql
	let query = "SELECT userid FROM users ORDER BY userid DESC LIMIT 1";
	getConnection(async function(err, conn){
		if(err){
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
		};

		try
		{
			let result = await conn.query(query);
			conn.release();
			return result[0];
		}catch(err){
			return null;
		}
	});
}

userMethods.register_user = function(value, done){
	console.log("inside req for adding user", value.data);
	let query = "INSERT INTO users (userid, email, password) VALUES ?";
	let userid = genUserId();
	userid += 1;
	//ecrypt password
	let pwd = bcrypt.hashSync(value.data.password, 10);
	let data_array = [userid, value.data.email, pwd];

	//DB insert user record
	getConnection(function(err,conn){
		if(err){
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
		};

		conn.query(query, [data_array], function(err, results){
			conn.release();

			if (err) {
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			}
			console.log("Number of records inserted: " + result.affectedRows);
			return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", method: "REGISTER"}});
		});
	});
	
}

module.exports = userMethods;