const sessions = require("express-session");
const sessionConfig = {
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: false,
};

module.exports = sessions(sessionConfig);
