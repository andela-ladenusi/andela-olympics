global._ = require('lodash');
global.t = require('moment');

var cookieParser = require('cookie-parser'),
  Firebase = require("firebase"),
  express = require('express'),
  env = process.env.NODE_ENV || 'development',
  config = require('./config/config')[env],
  routes = require('./api/routes'),
  bodyParser = require('body-parser'),
  app = express();

(function run(appdir, firebaseConfig) {
  app.use(cookieParser());

  app.dir = appdir;

  // Global middleware
  app.use(function (req, res, next) {
    // Log each request in development environment
    if(env !== 'production')
      console.log(t().format('HH:MM'), req.method, req.url, req.socket.bytesRead);

    // Create cookie variables
    res.cookie('apiKey', firebaseConfig.apiKey);
    res.cookie('authDomain', firebaseConfig.authDomain);
    res.cookie('databaseURL', firebaseConfig.databaseURL);
    res.cookie('storageBucket', firebaseConfig.storageBucket);
    next();
  });

  // static files
  app.use(express.static(app.dir + '/public'));

  // Standard error handling
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // To support JSON-encoded bodies
  app.use(bodyParser.json());

  // To support URL-encoded bodies
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  routes(app, config);

  var server = app.listen(process.env.PORT || 5555, function() {
    console.log('Listening on port %d', server.address().port);
  });

})(process.cwd(), config.firebase);

module.exports = app;
