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

//wait til sign-up page to finish
router.post('/register', function(req, res, next){
	kafka.produce({username: 'qili@hotmail.com', password:'1234'}, 'register_user', 'user_topic', 'user_res', function(value){
		res.send(JSON.stringify(value));
	});
});

router.post('/login',
  function(req, res) {
  	var _username = req.body.username;
  	var _password = req.body.password;

  	//Validation
  	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	kafka.produce({username: _username, password: _password}, 'login', 'login_topic', 'login_res', function(value){
		res.send(JSON.stringify(value));
		if (res.status === "SUCCESS") {
			passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return res.status(404).send('login error');
                }
                res.redirect('/');
            });
        });
		}
	});
  });

module.exports = router;
