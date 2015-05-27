angular.module('olympics.services')
  .factory('Requests', ['$cookies', '$http',
    function($cookies, $http) {
    	return {
        createTeam: function(url, object, callback) {
          $http.post(url, object)
          .success(function(data) {
            console.log(data);
            // var member_url = '/competitions/:competitionName/teams/:teamId/members';
            // $http.post(member_url, member)
            // .success(function(childData) {
            //   console.log(childData);
            //   callback();
            // })
            // .error(function(err) {
            //   return err;
            // });
          })
          .error(function(err) {
            return err;
          });
        },

    		joinTeam: function(url, object, callback) {
    			$http.post(url, object)
    			.success(function(data) {
    				console.log(data);
            callback();
    			})
    			.error(function(err) {
    				return err;
    			});
    		},

    		registerTeam: function(url, object) {
    			$http.post(url, object)
    			.success(function(data) {
    				console.log(data);
    			})
    			.error(function(err) {
    				return err;
    			});
    		}
    	};
    }
  ]);
