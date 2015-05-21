$(function() {
	$('.how-link').on('click', function() {
		console.log("Clicked");
		$('.overlay').scrollTo('.content.how', 800);
	});
});