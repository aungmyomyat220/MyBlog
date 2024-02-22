const sessions = require("express-session");

const sessionConfig = {
  secret: 'my-secret',
  resave: false, 
  saveUninitialized: false
};

module.exports = sessions(sessionConfig);
