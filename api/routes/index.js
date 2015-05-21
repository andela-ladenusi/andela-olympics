var users = require('./users.routes');

module.exports = function(app, config) {
  users(app, config);
};
