var madminMethods = {};
var getConnection = require('./database/mysql');
var getMongodb = require('./database/mongodb.js');
var mysql = require('mysql');


function getNextSequence(collection, name, cb){
    collection.findOneAndUpdate({ name }, { $inc : { value : 1}}, function(err, res){
        if(res)
            cb(res);
    });
}


madminMethods.post_movie = function(value, done){
    var data = value.data;
    if(data.title == undefined || data.trailer == undefined || data.characters == undefined ||
        data.categories == undefined || data.date == undefined || data.seeitin == undefined)
        return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE", msg: "NOT_ENOUGH_INFO"}});
    getMongodb(function(mongodb){
        var counter = mongodb.collection('counters');
        let movies = mongodb.collection('movies');
        movies.find({ title: data.title}).toArray(function(err, ele){
            if(ele.length != 0 )
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE", msg: "TITLE_EXISTS"}});

            getNextSequence(counter, 'movie_id', function(res){
                console.log("nect movie id: ", res.value);
                let characters = data.characters.split(",");
                let categories = data.categories.split(",");
                let seeitin = data.seeitin.split(",");
                let movie_doc = {
                    title: data.title,
                    trailer: data.trailer,
                    characters: characters,
                    categories: categories,
                    date: data.date,
                    seeitin: seeitin,
                    movie_id: res.value.value
                }
                console.log(movie_doc);
                movies.insertOne(movie_doc, function(err, res){
                    console.log(err);
                    if(err){
                        return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
                    }
                    if(res.result.ok == 1)
                        return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie_id: movie_doc.movie_id}});
                })
            });
        });
    });

}

madminMethods.get_movie_info = function(value, done){
    console.log("inside req for get movie info ", value.data);
    let movieid = value.data.movie_id;
    getMongodb(function(mongodb){
        var movies = mongodb.collection('movies');
        movies.find({movie_id: +movieid}).toArray(function(err, list){
            if(err){
                console.log("fail", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
            }
            var movie_info = {
                "movie_id": list[0].movie_id,
                "title": list[0].title,
                "trailer": list[0].trailer,
                "characters": list[0].characters,
                "date": list[0].date,
                "movie_length": list[0].movie_length,
                "seeitin": list[0].seeitin
            }
            return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie_info }});
        })
    });
}

madminMethods.update_movie_info = function(value, done) {
    console.log('inside update movie info', value.data);
    var data = value.data.body;
    var movieid = value.data.movie_id;
    getMongodb(function (mongodb) {
        var movies = mongodb.collection('movies');
        set = {
            title: value.data.body.title,
            trailer: value.data.body.trailer,
            movie_length: value.data.body.movie_length,
            date: value.data.body.date,
            characters: value.data.body.characters.split(",")
        }
        movies.findOneAndUpdate({movie_id: +movieid}, {"$set": set}, function (err, res) {
            console.log("res in update profile", arguments);
            if (err) {
                console.log("error in update movie info", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
            }
            console.log(res);
            return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS"}});
        });
    });
}

madminMethods.revenue_movie = function(value, done){
    let movietitle = value.data.movie_title;
    getMongodb(function(mongodb){
        var movies = mongodb.collection('movies');
        movies.find({ title: movietitle}).toArray(function(err, ele){
            if(err || ele.length == 0){
                console.log("fail", err);
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
            }
            let movie_id = ele[0].movie_id;
            let query = "Select movieid,sum(amount) as revenue from billing where movieid = " + mysql.escape(movie_id) + ";";
            console.log(query);
            getConnection(function(err, conn){
                if(err){
                    return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
                }
               conn.query(query, (err, results) => {
                   console.log(results);
                   conn.release();
                   if(err){
                       return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "FAILURE"}});
                   }
                   results[0].movietitle = movietitle;
                return done({correlationId: value.correlationId, replyTo: value.replyTo, data: {status: "SUCCESS", movie:results}});
               })
            })
        })
    })
}


module.exports = madminMethods;