var express = require('express');
var router = express.Router();
var passport = require('../passport.js');
var kafka = require('../kafka/kafka')();
var multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './images/hallimages');
	},
	filename: function (req, file, cb) {
		console.log("filename: ", req.query.hall_id);
		cb(null, req.query.hall_id + '.jpg');
	}
});
const upload = multer({ storage });

const storage1 = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './images/movieimages');
	},
	filename: function(req, file, cb){
		console.log("filename:", req.query.movie_id);
		cb(null, req.query.movie_id + '.jpg');
	}
});
const upload1 = multer ({storage1});

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

router.post('/hallimage', upload.single('file'), function(req, res, next){
	console.log("profile hall upload success");
	res.send({status: "SUCCESS"});
});

router.post('/movieimages', upload1.single('file'), function(req, res, next){
	console.log("movie image upload");
	res.send({status: "SUCCESS"});
});

module.exports = router;
