var Firebase = require('firebase'),
  _ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);
  var competition = root.child('competitions');

  var check_if_competition_exist = function(data, id) {
    return _.findWhere(data, function(val, key) {
      return key === id;

    });
  };

  var check_for_team_id = function(data, id){
    team_id_available = false;
    _.forEach(data, function(val, key){
      if(key === id) {
        team_id_available = true;
        return team_id_available;
      }
      else{
      _.forEach(val.members, function(val, key){
        if (key === id) {
          team_id_available = true;
          return team_id_available;
        }
      });
      }
    });
    return team_id_available;
  };
  var check_if_team_exist = function(data, team_id) {
    return _.findWhere(data, function(val, key) {
      return key === team_id;
    });
  };

  app.route('/competitions').get(function(req, res) {
    competition.once('value', function(snap) {
      var snapValues = snap.val();
      if (snapValues) {
        res.json(snapValues);
      } else {
        res.json({error:"invalid competition name"});
      }
    });
  });

  app.route('/competitions').post(function(req, res) {
    var existing_competitions, new_competition = req.body;
    console.log(new_competition);
    new_competition.created_date = Firebase.ServerValue.TIMESTAMP;
    competition.child(new_competition.name).set(new_competition, function(error) {
      if (!error) {
        res.json(new_competition);
      } else {
        res.json({
          error: 'Could create a new competition'
        });
      }
    });
    // competition.once('value', function(snap) {
    //   check_if_competition_exist = snap.hasChild(new_competition.name);
    //   if (check_if_competition_exist) {
    //     res.json({
    //       error: 'This competition already exists'
    //     });
    //   } else {
    //     competition.child(new_competition.name).set(new_competition, function(error) {
    //       if (!error) {
    //         res.json(new_competition);
    //       } else {
    //         res.json({
    //           error: 'error'
    //         });
    //       }
    //     });
    //   }
    // });
  });

  app.route('/competitions/:competitionName').get(function(req, res) {
    competition.once('value', function(snap) {
      var snapValues = snap.val();
      snapValues = _.findWhere(snapValues, function(val, key) {
        return key === req.params.competitionName;
      });
      if (snapValues) {
        res.json(snapValues);
      } else {
        res.json({error:"invalid competition name"});
      }
    });
  });
  app.route('/competitions/:competitionName').put(function(req, res) {
    var existing_competitions;
    competitionName = req.params.competitionName;
    existing_competitions = req.body;
    existing_competitions.updated_date = Firebase.ServerValue.TIMESTAMP;

    competition.once('value', function(snap) {
      check_if_competition_exist = check_if_competition_exist(snap.val(), competitionName);
      if (!check_if_competition_exist) {
        res.json({
          error: 'This competition does not exists'
        });
      } else {
        existing_competitions = _.extend(check_if_competition_exist, existing_competitions);
        competition.child(competitionName).set(existing_competitions, function(error) {
          if (!error) {
            res.json(existing_competitions);
          } else {
            res.json({
              error: 'You can\'t update this competition'
            });
          }
        });
      }
    });
  });

  app.route('/competitions/:competitionName/register').post(function(req, res) {
    competition.child(req.params.competitionName).child('teams').once('value', function(snap) {
      var teams = snap.val();
      check_for_team_id(teams, req.body.team_id);
      if (team_id_available) {
        res.json({
          error: 'You are already a memeber of a team'
        });
      } else {
        competition.child(req.params.competitionName).child('teams').child(req.body.team_id).set({
          name: req.body.name,
          description: req.body.description,
          registered: false
        }, function(error) {
          if (!error) {
            competition.child(req.params.competitionName).child('teams').child(req.body.team_id).child('members').child(req.body.team_id).set(true, function(error) {
              if (error) {
                res.json({error: 'you were unable to join the team automatically'});
              } else {
                res.json(req.body);
              }
            });
          } else {
            res.json({
              error: 'Team not successfully created'
            });
          }
        });
      }
    });
  });

app.route('/competitions/:competitionName/register/:registerId').put(function(req, res) {
  competition.child(req.params.competitionName).child('teams').once('value', function(snap) {
    team_id_available = snap.hasChild(req.params.registerId);
    registered_team = _.findWhere(snap.val(), function(val, key) {
      return key === req.params.registerId;
    });
    if (!team_id_available) {
      res.json({
        error: 'Team does not exist'
      });
    } else {
      registered_team.registered = true;
      competition.child(req.params.competitionName).child('teams').child(req.body.team_id).set(registered_team);
    }
  });
});



  app.route('/competitions/:competitionName/teams/:teamId/members').post(function(req, res) {
    team_id = req.params.teamId;
    competition_name = req.params.competitionName;
    competition.child(req.params.competitionName).child('teams').once('value', function(snap) {
      snapValues = snap.val();
      team_exist = check_if_team_exist(snapValues, team_id);
       new_member = check_for_team_id(snapValues, req.body.user_id);
      if (team_exist && !new_member) {
        competition.child(req.params.competitionName).child('teams').child(team_id).child('members').child(req.body.user_id).set(false, function(error) {
          if (error) {
            res.json({error:'Your could not join this team'});
          } else {
            res.json(req.body);
          }
        });
      }
      else{
        res.json({error: 'You are already a member of a team'});
      }
    });
  });

  app.route('/competitions/:competitionName/teams/:teamId/members/:memberId').put(function(req, res) {
    team_id = req.params.teamId;
    competition_name = req.params.competitionName;
    competition.child(req.params.competitionName).child('teams').child(team_id).child('members').child(req.params.memberId).once('value', function(snap) {
      snapValues = snap.val();
      if(snapValues === null){
        res.json({error: 'invalid entry'});
      }
      else if (!snapValues) {
        competition.child(req.params.competitionName).child('teams').child(team_id).child('members').child(req.params.memberId).set(true, function(error) {
          if (error) {
            res.json({error:'You can\'t join the team'});
          } else {
            res.json(req.params.memberId);
          }
        });
      } else {
        competition.child(req.params.competitionName).child('teams').child(team_id).child('members').child(req.params.memberId).set(false, function(error) {
          if (error) {
            res.json({error: 'You can\'t join the team'});
          } else {
            res.json(req.params.memberId);
          }
        });
      }
    });
  });
};
