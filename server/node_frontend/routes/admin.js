var express = require('express');
var router = express.Router();
var kafka = require('../kafka/kafka')();

function auth(req, res, next){
	console.log(req.user);
	if(!req.user || req.user.type!="admin")
	  return res.send({"error": "UNAUTHORISED"});

	next();
}

router.get('/revenue_movies', function(req, res, next){
	kafka.produce({}, 'revenue_movies', 'admin_topic', 'admin_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get('/user', auth, function(req, res, next){
	return res.send(JSON.stringify(req.user));
});

module.exports = router;
