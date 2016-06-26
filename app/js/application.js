// defining modules
angular.module('olympics.controllers', []);
angular.module('olympics.services', []);

/* loading services */
require('./services/auth.js');
require('./services/refs.js');
require('./services/competitions.js');
require('./services/user.js');
require('./services/http.requests.js');


// loading controller
require('./controllers/mainCtrl.js');

var Olympics = angular.module('Olympics', [
	'ui.router',
	'ngCookies',
	'firebase',
	'olympics.controllers',
	'olympics.services'
]);

Olympics.config(['$stateProvider','$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$stateProvider
			.state('home', {
        url: '/',
				templateUrl: 'views/home.html',
				controller: 'mainCtrl'
			})
      .state('404', {
        url: '/404',
        templateUrl: '404.html'
      });

    $urlRouterProvider.otherwise('/404');
	}]);

Olympics.run(['$rootScope', 'Authentication', 'Refs',
  function($rootScope, Authentication, Refs) {
    Refs._auth().$onAuthStateChanged(function(firebaseUser) {
      if(!firebaseUser) {
        Authentication.logout()
      } else {
        var user = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          accessToken: firebaseUser.refreshToken,
          picture: firebaseUser.photoURL
        };
        $rootScope.currentUser = user;
        return $rootScope.currentUser;
      }
    });
  }]);

$(function() {
	$('a.details-link').on('click', function() {
		console.log("Clicked");
		$('.overlay').scrollTo('.competition-details', 800);
	});
});
