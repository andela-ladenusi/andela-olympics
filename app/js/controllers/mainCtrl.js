angular.module('olympics.controllers')
.controller('mainCtrl', ['Authentication', '$scope', '$rootScope', '$location', '$timeout', '$http', 'Competitions', 'UserDetails', 'Requests',
	function(Authentication, $scope, $rootScope, $location, $timeout, $http, Competitions, UserDetails, Requests) {

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
			var competitions = Competitions.botOlympics();
			competitions.$loaded().then(function(data) {
				_.forEach(data.teams, function(team, team_id) {
					var members = [];
					for(var i in team.members) {
						var profile = UserDetails.profile(i);
						team.members[i] = profile;
					}
				});
				$scope.competition = data;
			});
		};

		$scope.init();

		$scope.joinTeam = function(team_id) {
			var url 		= '/competitions/Bot Olympics/teams/' + team_id + '/members/',
					object 	= {user_id: $rootScope.currentUser.uid};
			console.log(url, object);
			Requests.joinTeam(url, object, $scope.init);
		};

		$scope.registerTeam = function() {
			$scope.team.team_id = $rootScope.currentUser.uid;
			var url = '/competitions/Bot Olympics/register';
			Requests.registerTeam(url, $scope.team);
		};

	}
]);
