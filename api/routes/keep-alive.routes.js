module.exports = function (app) {
	app.route('/keep-alive').get(function (req, res) {
		res.send('I am alive');
	});
};
