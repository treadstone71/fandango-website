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

router.get('/city_revenue', function(req, res, next){
	kafka.produce({ movie_title : req.query.movie}, 'city_revenue', 'admin_topic', 'admin_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get('/get_halls', function(req, res, next){
	kafka.produce({}, 'get_halls', 'admin_topic', 'admin_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.post('/post_hall', function(req, res, next){
	console.log(req.body);

	kafka.produce(req.body, 'post_hall', 'admin_topic', 'admin_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get('/get_bills', function(req, res, next){
	console.log(req.query);
	kafka.produce({startDate: req.query.startDate, endDate: req.query.endDate}, 'get_bills', 'admin_topic', 'admin_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get('/get_bill_info', function(req, res, next){
	console.log(req.query);
	kafka.produce({billingid : req.query.billingid}, 'get_bill_info', 'admin_topic', 'admin_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.get('/user', auth, function(req, res, next){
	return res.send(JSON.stringify(req.user));
});

module.exports = router;
