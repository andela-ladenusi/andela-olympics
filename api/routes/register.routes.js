var Firebase = require('firebase'),
_ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);
  app.route('/competitions/register').get(function(req, res) {
    res.json('read registered');
  });
  app.route('/competitions/register').post(function(req, res) {
    newly_registered = req.body;
    res.json('register it');
  });
  app.route('/competitions/register').put(function(req, res) {
    res.json('update registered');
  });
  app.route('/competitions/register').delete(function(req, res) {
    res.json('delete registered');
  });
};
