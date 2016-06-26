angular.module('olympics.services')
  .factory('Competitions', ['$cookies', '$firebaseObject', 'Refs',
    function($cookies, $firebaseObject, Refs) {  
      return {
        iothackathon: $firebaseObject(Refs.iothackathon)
      };
    }
  ]);
