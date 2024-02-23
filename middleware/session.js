const sessions = require("express-session");

const sessionConfig = {
  secret: 'my-secret',
  resave: false, 
  saveUninitialized: true,
  httpOnly: true
};

module.exports = sessions(sessionConfig);
