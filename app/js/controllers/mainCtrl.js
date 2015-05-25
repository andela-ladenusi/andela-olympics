angular.module('olympics.controllers')
.controller('mainCtrl', ['Authentication', '$scope', '$rootScope', '$location', '$timeout',
	function(Authentication, $scope, $rootScope, $location, $timeout) {
		$scope.login = function() {
			Authentication.login();
			console.log('You just logged in');
		};
		$scope.logout = function() {
			Authentication.logout();
			$location.url('/');
			console.log('You just logged out');
		};
		// $scope.$watch(function() {
		// 	console.log($rootScope.currentUser);
		// });
	}
]);