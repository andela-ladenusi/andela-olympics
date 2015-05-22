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
    competition.once('value', function(snap) {
      teams = snap.val();
      var check_if_team_exist = function(data) {
        return _.findWhere(data.teams, function(val) {
          return val.team_name === req.body.team_name;
        });
      };

      var check_if_competition_exist = function() {
        return _.findWhere(teams, function(val) {
          return val.competition_name === req.body.competition_name;
        });
      };
      var competition_exist = check_if_competition_exist();
      if (competition_exist) {
        if (check_if_team_exist(competition_exist)) {
          res.json({
            error: 'This team already exists'
          });
        } else {
          competition.child(req.body.competition_name).child('teams').child(req.body.team_name).set(req.body, function(error) {
            if (!error) {
              res.json(req.body);
            } else {
              res.json('error');
            }
          });
        }
      } else {
        res.json("invqalid response");
      }
    });
  });
};
