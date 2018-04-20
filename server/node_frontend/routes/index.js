var express = require('express');
var router = express.Router();
var passport = require('../passport.js');
var kafka = require('../kafka/kafka')();

function auth(req, res, next){
	console.log(req.user);
	if(!req.user)
	  return res.send({"error": "UNAUTHORISED"});

	next();
}

router.post('/login', passport.authenticate('local'), function(req, res, next) {
	//have to send a request to kafka to process
	console.log("after successful login inside login rest", req.user);
	return res.send({status: "SUCCESS", username: req.user.username, type: req.user.type});
});

router.get('/logout', auth, function(req, res, next){
	console.log("inside logout ", req.user)
	req.session.destroy();
	res.send({status: "SUCCESS"});
});

module.exports = router;
