var Firebase = require('firebase'),
needle = require('needle');
_ = require('lodash');

module.exports = function(app, config) {
  var root = new Firebase(config.firebase.rootRefUrl);
  app.route('/users/register').post(function(req, res) {
    var data = req.body;
    var user = {
      name : data.name,
      accessToken : data.accessToken,
      gravatar: data.gravatar
    };
    root.child('users').child(data.uid)
      .set(user, function(err) {
        if (!err) {
          res.status(200)
            .send(data);
        };
      });
  });

  app.route('/users/team').post(function(req, res) {
   var team = req.body;
   root.child('teams').once('value', function(snap) {
     var data = snap.val();
     for (var uid in data) {
       if (uid === team.uid) {
        return res.json('You can create only one team');
       } 
     }

     root.child('teams').child(team.uid)
      .push(team, function(err) {
        if (!err) {
          res.status(200).json('Team Successfully created');
        }
      });

   });
  });

  
};
