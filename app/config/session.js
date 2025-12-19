const expressSession = require('express-session');

module.exports = expressSession({
  secret: "Anuj2611",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 3600000
  }
});
