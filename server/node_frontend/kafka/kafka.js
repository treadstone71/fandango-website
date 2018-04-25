var kafka = require('kafka-node');
var crypto = require('crypto');

function Kafka(){
	this.producer = new kafka.HighLevelProducer(new kafka.Client("localhost:2181"));
	this.requests = {};
	this.consumer = new kafka.HighLevelConsumer(new kafka.Client("localhost:2181"), [{topic: 'login_res'}, {topic: 'admin_res'}, {topic: 'madmin_res'}, {topic: 'user_res'}], {autoCommit: true});
	this.startConsuming();
}

Kafka.prototype.produce = function(data, func, produce_topic, consume_topic, callback){
	var correlationId = crypto.randomBytes(16).toString('hex');
	var self = this;

	var tId = setTimeout(function(corr_id){
        //if this ever gets called we didn't get a response in a
        //timely fashion
        console.log('timeout');
        // callback(new Error("timeout " + corr_id));
        //delete the entry from hash
        delete self.requests[corr_id];
    }, 8000, correlationId);

    var entry = {
        callback: callback,
        timeout: tId //the id for the timeout so we can clear it
    };

    this.requests[correlationId]=entry;

    var payloads = [{ 
            	topic: produce_topic, 
            	messages: JSON.stringify({
	                correlationId,
	                replyTo: consume_topic,
	                func,
	                data
            	})
        	}];

    console.log("sending to kafka", payloads[0].messages);
    this.producer.send(payloads, function(err, data){
    	console.log("sent to kafka", err, data);
    });

}

Kafka.prototype.startConsuming = function(){
	var self = this;
	this.consumer.on('message', function(message){
		console.log("received message: ", message);
		let value = JSON.parse(message.value);
		console.log(value);

		if(self.requests.hasOwnProperty(value.correlationId)){
			let cb = self.requests[value.correlationId].callback;
			clearTimeout(self.requests[value.correlationId].timeout);
			delete self.requests[value.correlationId];
			cb(value.data);
		}
	});
}

var mainkafka = null;
function returnkafka(){
	if(mainkafka) return mainkafka;
	mainkafka = new Kafka();
	return mainkafka;
}


module.exports = returnkafka;