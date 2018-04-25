var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'cmpe273instance.cb4ip3gl3lol.us-east-2.rds.amazonaws.com',
    user     : 'projectgroup4',
    password : 'cmpe-273',
    database : 'fandango'
});

//callback will be called with two arguments, err --> error and con --> connection object 
//dont forget to call conn.release() after using the connection
var getConnection = function(callback){
	pool.getConnection(callback);
}

module.exports = getConnection;