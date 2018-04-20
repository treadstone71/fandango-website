var express = require('express')
var app = express();
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('./passport.js');
var config = require('./config.json');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var madmin = require('./routes/madmin');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('images'));
app.use(express.static('uploads'));

//Address and port where the front end react code is hosted. 
app.use(cors({origin: config.origin, credentials: true}));

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

app.use(session({
  name: 'session',
  secret: 'I[Py{dgY3RCwsADP*#cnpxjzXTPsn',
  maxAge: 30 * 60 * 1000,
  resave: false,
  saveUninitialized: false,
  cookie: {
  	httpOnly: false
  },
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/madmin', madmin);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

process.on('uncaughtException', (err) => {
    console.log("uncaughtException: ", err);
});

// Export server for testing.
var server = app.listen(3000);
module.exports = server;
