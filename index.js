const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');
const express = require('express');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//dynamic port binding
const PORT = process.env.PORT || 3000;

const DAYS = 10,
  HOURS = 24,
  MINUTES = 60,
  SECONDS = 60,
  MILLISECONDS = 1000;

//Adding JSON Parser middleware for POSTS/PUTS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Sets the cookie key for authentication
app.use(
  cookieSession({
    maxAge: DAYS * HOURS * MINUTES * SECONDS * MILLISECONDS,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);
require('./routes/user-routes')(app);

// Only do this in production
if (process.env.NODE_ENV === 'production') {
  //Have Express serve our js and css files
  app.use(express.static('user-giphy-client/build'));

  //Have Express serve up our HTML file
  //If we don't recognize the path, show the website
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(path.dirname(''), 'user-giphy-client', 'build', 'index.html')
    );
  });
}
app.listen(PORT);
