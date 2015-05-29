angular.module('olympics.controllers')
.controller('mainCtrl', ['Authentication', '$scope', '$rootScope', '$location', '$timeout', '$http', 'Competitions', 'UserDetails', 'Requests',
	function(Authentication, $scope, $rootScope, $location, $timeout, $http, Competitions, UserDetails, Requests) {

		$scope.login = function() {
			Authentication.login();
		};

		$scope.logout = function() {
			Authentication.logout();
			$location.url('/');
      Materialize.toast('You have successfully logged out!', 5000, 'teal accent-4');
		};

		$scope.init = function() {
			var competitions = Competitions.botOlympics();
			competitions.$loaded().then(function(data) {
				// _.forEach(data.teams, function(team, team_id) {
				// 	var members = [];
				// 	for(var i in team.members) {
				// 		var profile = UserDetails.profile(i);
				// 		team.members[i] = profile;
				// 	}
				// });
				$scope.competition = data;
			});
		};


		$scope.createTeam = function() {
			var url = '/competitions/Bot Olympics/register';
			$scope.team.team_id = $rootScope.currentUser.uid;
			Requests.createTeam(url, $scope.team, $scope.init);
		};

		$scope.joinTeam = function(team_id) {
			var url 		= '/competitions/Bot Olympics/teams/' + team_id + '/members/',
					object 	= {user_id: $rootScope.currentUser.uid};
			console.log(url, object);
			Requests.joinTeam(url, object, $scope.init);
		};

		$scope.registerTeam = function(team_id) {
			var url = '/competitions/Bot Olympics/register/' + team_id;
			Requests.registerTeam(url, {registerId: team_id, user_id: $rootScope.currentUser.uid});
		};

		$scope.acceptMember = function(memberId) {
			$scope.team_id =  $rootScope.currentUser.uid;
			var url = '/competitions/Bot Olympics/teams/' + $scope.team_id + '/members/' + memberId;
			Requests.acceptMember(url, $scope.init);
		};

		$scope.declineMember = function(memberId) {
			$scope.team_id =  $rootScope.currentUser.uid;
			var url = '/competitions/Bot Olympics/teams/' + $scope.team_id + '/members/' + memberId;
			Requests.declineMember(url, $scope.init);
		};

		$scope.init();
	}
]);
