var Firebase = require('firebase'),
  _ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);
  var competition = root.child('competitions');
  app.route('/competitions').post(function(req, res) {
    var existing_competitions;
    new_competition = req.body;
    new_competition.created_date = Firebase.ServerValue.TIMESTAMP;
    competition.once('value', function(snap) {
      check_if_competition_exist = snap.hasChild(new_competition.competition_name);
      if (check_if_competition_exist) {
        res.json({
          error: 'This competition already exists'
        });
      } else {
        competition.child(new_competition.competition_name).set(new_competition, function(error) {
          if (!error) {
            res.json(new_competition);
          } else {
            res.json('error');
          }
        });
      }
    });
  });

  app.route('/competitions/register').post(function(req, res) {
    
  });
};