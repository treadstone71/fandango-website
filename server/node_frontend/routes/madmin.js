var express = require('express');
var router = express.Router();
var kafka = require('../kafka/kafka')();

function auth(req, res, next){
	console.log(req.user);
	if(!req.user || req.user.type!="madmin")
	  return res.send({"error": "UNAUTHORISED"});

	next();
}

router.get('/user', auth, function(req, res, next){
	return res.send(JSON.stringify(req.user));
});

router.post('/post_movie', function(req, res, next){
	console.log(req.body);
    kafka.produce(req.body, 'post_movie', 'madmin_topic', 'madmin_res', function(value){
        res.send(JSON.stringify(value));
    });
});

module.exports = router;
