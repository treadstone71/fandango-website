var express = require('express');
var router = express.Router();
var kafka = require('../kafka/kafka')();

function auth(req, res, next){
	console.log(req.user);
	if(!req.user || req.user.type!="user")
	  return res.send({"error": "UNAUTHORISED"});

	next();
}

router.get('/user', auth, function(req, res, next){
	return res.send(JSON.stringify(req.user));
});

router.get('/user/register', function(req, res, next){
	kafka.produce({email: 'qili@hotmail.com', password:'1234'}, 'register_user', 'user_topic', 'user_res', function(value){
		res.send(JSON.stringify(value));
	});
});

module.exports = router;
