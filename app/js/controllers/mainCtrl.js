angular.module('olympics.controllers')
.controller('mainCtrl', ['Authentication', '$scope', '$rootScope', '$location', '$timeout', '$http', 'Refs',
	function(Authentication, $scope, $rootScope, $location, $timeout, $http, Refs) {
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
		$scope.competition = {};
		$http.get('/competitions/Bot%20Olympics')
		.success(function(data) {
			$scope.competition = data;
			console.log($scope.competition);
			return $scope.competition;
		})
		.error(function(error) {
			console.log(error);
			return error;
		});
	}
]);