angular.module('olympics.services')
  .factory('Requests', ['$cookies', '$http',
    function($cookies, $http) {
    	return {
        createTeam: function(url, object, callback) {
          $http.post(url, object)
          .success(function(data) {
            console.log(data);
            callback();
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

    		registerTeam: function(url, object, callback) {
    			$http.put(url, object)
    			.success(function(data) {
    				console.log(data);
            callback();
    			})
    			.error(function(err) {
    				return err;
    			});
    		},
        acceptMember: function(url, object, callback) {
          $http.put(url, object)
          .success(function(data) {
            console.log(data);
            callback();
          })
          .error(function(err) {
            return err;
          });
        },

        declineMember: function(url, object, callback) {
          $http.put(url, object)
          .success(function(data) {
            console.log(data);
            callback();
          })
          .error(function(err) {
            return err;
          });
        }
    	};
    }
  ]);
