const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = "mongodb://projectgroup4:cmpe-273@ds251849.mlab.com:51849/fandango";
var db = undefined;

module.exports = function(cb){
	// Use connect method to connect to the server
	if(db) cb(db);
	else{
		MongoClient.connect(url, function(err, client) {
		  
	  		if(err) return console.log(err);

	  		console.log("Connected successfully to mongo server");
	  		db = client.db("fandango");
	  		cb(db);
		});
	}
}