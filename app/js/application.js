// defining modules
angular.module('olympics.controllers', []);
angular.module('olympics.services', []);

/* loading services */
require('./services/auth.js');
require('./services/refs.js');

// loading controller
require('./controllers/mainCtrl.js');

window.Olympics = angular.module('Olympics', [
	'ngRoute',
	'olympics.controllers',
	'olympics.services'
]);

Olympics.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'mainCtrl'
			})
			.otherwise({
				templateUrl: '404.html'
			});
	}]);








$(function() {
	$('.how-link').on('click', function() {
		console.log("Clicked");
		$('.overlay').scrollTo('.content.how', 800);
	});
});