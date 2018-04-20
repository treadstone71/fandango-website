var loginMethods = {}

loginMethods.login = function(value, done){
	var data = value.data;
	if(data.username == "normaluser" && data.password == "pass"){
		return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type:"user", username: data.username}});
	}
	if(data.username == "adminuser" && data.password == "pass"){
		return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type:"admin", username: data.username}});
	}
	if(data.username == "moviehalluser" && data.password == "pass"){
		return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", type:"madmin", username: data.username}});
	}
	return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
}

module.exports = loginMethods;