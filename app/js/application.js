// defining modules
angular.module('hackathons.controllers', []);
angular.module('hackathons.services', []);

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
  	Refs.root.onAuth(function(authData) {
  		if(authData) {
  			var user = {
          uid: authData.uid,
          name: authData.google.displayName,
          email: authData.google.email,
          accessToken: authData.google.accessToken,
          picture: authData.google.cachedUserProfile.picture
        };
  			$rootScope.currentUser = user;
  			return $rootScope.currentUser;
  		}
      else {
      	Authentication.logout();
      }
    });
  }]);

$(function() {
	$('.how-link').on('click', function() {
		console.log("Clicked");
		$('.overlay').scrollTo('.content.how', 800);
	});
});
