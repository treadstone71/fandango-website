var express = require('express');
var router = express.Router();
var kafka = require('../kafka/kafka')();
var passport = require('../passport');

function auth(req, res, next){
	console.log(req.user);
	if(!req.user || req.user.type!="user")
	  return res.send({"error": "UNAUTHORISED"});

	next();
}

router.get('/user', auth, function(req, res, next){
	return res.send(JSON.stringify(req.user));
});

router.get("/get_movie_category", function(req, res, next){
	kafka.produce({ category : req.query.category}, 'get_movie_category', 'user_topic', 'user_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get("/get_movie", function(req, res, next){
	kafka.produce({ moviename : req.query.movie}, 'get_movie', 'user_topic', 'user_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get("/get_movie_hall", function(req, res, next){
	kafka.produce({ hallname : req.query.hallname}, 'get_movie_hall', 'user_topic', 'user_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get("/get_movie_info", function(req, res, next){
	kafka.produce({ movieid : req.query.movieid}, 'get_movie_info', 'user_topic', 'user_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.post("/bookticket", function(req, res, next){
	kafka.produce(req.body , 'bookticket', 'user_topic', 'user_res', function(value){
		res.send(JSON.stringify(value));
	});
});

module.exports = router;
