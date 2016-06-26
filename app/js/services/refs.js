angular.module('olympics.services')
  .factory('Refs', ['$cookies', '$firebaseAuth',
    function($cookies, $firebaseAuth) {
      let config = {
        apiKey: $cookies.get('apiKey'),
        authDomain: $cookies.get('authDomain'),
        databaseURL: $cookies.get('databaseURL'),
        storageBucket: $cookies.get('storageBucket'),
      }

      var app = firebase.initializeApp(config);

      var db = app.database()

      return {
        root: db.ref(),
        users: db.ref('users'),
        competitions: db.ref('competitions'),
        iothackathon: db.ref('competitions/iothackathon'),
        _auth: function() {
          return $firebaseAuth(app.auth())
        }
      };
    }
  ]);
