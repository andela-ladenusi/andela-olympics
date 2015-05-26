angular.module('olympics.controllers')
.controller('mainCtrl', ['Authentication', '$scope', '$rootScope', '$location', '$timeout', '$http', 'Refs', 'Competitions', 'UserDetails',
	function(Authentication, $scope, $rootScope, $location, $timeout, $http, Refs, Competitions, UserDetails) {

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
				_.forEach(data.teams, function(team, team_id) {
					var members = [];
					for(var i in team.members) {
						var profile = UserDetails.profile(i);
						team.members[i] = profile;
					}
				});
				$scope.competition = data;
				console.log(data);
			});
		};

		$scope.init();
		$scope.joinTeam = function() {

		};
	}
]);
