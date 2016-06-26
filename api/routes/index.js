var firebase = require('firebase');

var teams = require('./teams.routes'),
		users = require('./users.routes'),
		keepAlive = require('./keep-alive.routes');

module.exports = function(app, config) {
  var firebaseApp = firebase.initializeApp(config.firebase);
  
  teams(app, firebaseApp, config);
  users(app, firebaseApp, config);
  keepAlive(app);
};
