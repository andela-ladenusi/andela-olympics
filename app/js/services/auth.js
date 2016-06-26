angular.module('olympics.services')
  .factory('Authentication', ['$timeout', '$cookies', '$http', '$rootScope', 'Refs',
    function($timeout, $cookies, $http, $rootScope, Refs) {
      return {
        login: function(cb) {
          Refs._auth().$signInWithPopup("google").then(function(result) {
            console.log("Signed in as:", result.user.uid);
            var user = {
              uid: result.user.uid,
              name: result.user.displayName,
              email: result.user.email,
              accessToken: result.user.refreshToken,
              picture: result.user.photoURL
            };
            $http.post('/users/register', user)
              .success(function(data){
                $timeout(function() {
                  self.user = data;
                });
                Materialize.toast('You have successfully logged in!', 5000, 'teal accent-4');
                return;
              })
              .error(function(error) {
                console.log(error);
              });
          }).catch(function(error) {
            console.error("Authentication failed:", error);
          });
        },
        logout: function() {
          Refs._auth().$signOut()
          console.log("Logging user out");
          $rootScope.currentUser = null;
        },
      };
    }
  ]);
