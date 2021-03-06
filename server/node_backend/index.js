var kafka = require('kafka-node');
var loginMethods = require('./login.js');
var adminMethods = require('./admin.js');
var userMethods = require('./users.js');
var madminMethods = require('./madmin.js');

function Kafka(){
	this.producer = new kafka.HighLevelProducer(new kafka.Client("localhost:2181"));
	this.consumer = new kafka.HighLevelConsumer(new kafka.Client("localhost:2181"), [{topic: 'login_topic'}, {topic: 'user_topic'}, {topic: 'admin_topic'}, {topic: 'madmin_topic'}], {autoCommit: true});
	this.startConsuming();
}

Kafka.prototype.startConsuming = function(){
	var self = this;
	this.consumer.on('message', function(message){
		console.log("received message: ", message);
		let value = JSON.parse(message.value);
		console.log(value);

		//call function depending on topic it has to write to
		switch(value.replyTo){
			case "login_res":
				loginMethods[value.func](value, self.done.bind(self));
			break;
			case "admin_res":
				adminMethods[value.func](value, self.done.bind(self));
			break;
			case "user_res":
				userMethods[value.func](value, self.done.bind(self));
			break;
			case "madmin_res":
				madminMethods[value.func](value, self.done.bind(self));
			break;
		}
	});
}

Kafka.prototype.done = function(message){
	var payloads = [{ 
    	topic: message.replyTo, 
    	messages: JSON.stringify({
            correlationId: message.correlationId,
            data: message.data
    	})
	}];

	this.producer.send(payloads, function(err, data){
    	console.log("sent to kafka from consumer", err, data);
    });
}

new Kafka();

process.on('uncaughtException', (err) => {
	console.log("uncaughtException: ", err);
});