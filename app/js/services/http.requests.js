angular.module('olympics.services')
  .factory('Requests', ['$cookies', '$http',
    function($cookies, $http) {
    	return {
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