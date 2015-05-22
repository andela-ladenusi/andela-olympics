// defining modules
angular.module('olympics.controllers', []);
angular.module('olympics.services', []);

/* loading services */
require('./js/services/auth.js');
require('./js/services/refs.js');

window.Olympics = angular.module('Olympics', [
	'ui.router',
	'olympics.controllers',
	'olympics.services'
]);










$(function() {
	$('.how-link').on('click', function() {
		console.log("Clicked");
		$('.overlay').scrollTo('.content.how', 800);
	});
});