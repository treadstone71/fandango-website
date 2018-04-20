var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var kafka = require('./kafka/kafka')();

passport.use(new LocalStrategy(function(username, password, done){
	console.log("inside passport authentication local strategy");

	kafka.produce({username, password}, 'login', 'login_topic', 'login_res', function(res){
		console.log("res inside kafka callback", res);
		if(res.status == "SUCCESS"){
			return done(null, {username, type: res.type});
		}
		return done(null, false);
	});
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;