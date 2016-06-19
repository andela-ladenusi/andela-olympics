angular.module('olympics.services')
  .factory('Refs', ['$cookies', '$firebase',
    function($cookies, $firebase) {
      let config = {
        apiKey: $cookies.apiKey,
        authDomain: $cookies.authDomain,
        databaseURL: $cookies.databaseURL,
        storageBucket: $cookies.storageBucket,
      }

      var app = firebase.initializeApp(config);

      var rootRef = app.database()

      return {
        root: rootRef,
        users: rootRef.ref('users'),
        competitions: rootRef.ref('competitions'),
        iothackathon: rootRef.ref('competitions/iothackathon'),
      };
    }
  ]);
