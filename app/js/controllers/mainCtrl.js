angular.module('olympics.controllers')
.controller('mainCtrl', ['Authentication', '$scope', '$rootScope', '$location', '$timeout', '$http', 'Refs', 'Competitions',
	function(Authentication, $scope, $rootScope, $location, $timeout, $http, Refs, Competitions) {

		$scope.login = function() {
			Authentication.login();
			console.log('You just logged in');
		};

		$scope.logout = function() {
			Authentication.logout();
			$location.url('/');
			console.log('You just logged out');
		};

		$scope.init = function() {
			var competition = Competitions.botOlympics();
			competition.$loaded().then(function(data) {
				console.log(data);
				$scope.competition = data;
			});
		};

		$scope.init();
	}
]);
