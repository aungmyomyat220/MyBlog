const sessions = require("express-session");

const sessionConfig = {
  secret: 'my-secret',
  resave: false, 
  saveUninitialized: false,
  httpOnly: true
};

module.exports = sessions(sessionConfig);
