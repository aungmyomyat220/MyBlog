const sessions = require("express-session");

const sessionConfig = {
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: true,
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000,
      },
};

module.exports = sessions(sessionConfig);
