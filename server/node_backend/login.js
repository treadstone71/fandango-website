var loginMethods = {}
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');
var mysql = require('mysql'); 
var cryptPassword = require('./crypto.js').cryptPassword;
var comparePassword = require('./crypto.js').comparePassword;

let adminusername = "admin";
let adminpassword = "password";

loginMethods.login = function(value, done){
	var data = value.data;
	var username = data.username;
	var password = data.password;
	if(adminusername == username && adminpassword == password)
		return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type: "admin"}});

	getConnection(function(err, conn){
		let query = "select password from users where username=" + mysql.escape(username) + ";";
		conn.query(query, function(err, results){
			conn.release();
			if(results.length!=0){
				if(password == results[0].password)
					return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type: "user"}});
				
				comparePassword(password, results[0].password, function(err, ismatch){
					if(ismatch)
						return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type: "user"}});
					console.log("herehere", password, results[0].password, ismatch);
					return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
				});
			} else {
			//check in mongo
			getMongodb(function(mongodb){
				var moviehall = mongodb.collection("moviehall");
				moviehall.find({ username }).toArray(function(err, ele){
					if(ele.length == 0)
						return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});

					if(password == ele[0].password)
						return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type:"madmin"}});

					comparePassword(password, ele[0].password, function(err, ismatch){
						if(ismatch)
							return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type: "madmin"}});
						return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
					});
					
				});
			});
		}
		});
	});
}

loginMethods.signup = function(value, done){
	var data = value.data;
	if(data.username == adminusername)
		return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});

	getConnection(function(err, conn){
		let query = "select password from users where username=" + mysql.escape(data.username) + ";";
		conn.query(query, function(err, results){
			if(err || results.length!=0){
				return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
			}
			//check in mongo
			getMongodb(function(mongodb){
				var moviehall = mongodb.collection("moviehall");
				moviehall.find({ username: data.username }).toArray(function(err, ele){
					if(err || ele.length != 0)
						return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
					console.log("main pass: ", data.password);
					cryptPassword(data.password, function(err, hash){
						console.log("crypt pass: ", hash);
						let query = "INSERT INTO users (username,password,email) VALUES (" + mysql.escape(data.username) +","+mysql.escape(hash) +"," +mysql.escape(data.email) + ");";
						conn.query(query, function(err, results){
							if(err)
								return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
							return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS"}});
						});
					})
				});
			});
		});
	});
}

module.exports = loginMethods;
