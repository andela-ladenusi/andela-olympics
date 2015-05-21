var register_team = require('./register.routes.js');

module.exports = function(app, config) {
  register_team(app, config);
};
