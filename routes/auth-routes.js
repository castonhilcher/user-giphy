const passport = require('passport');

module.exports = app => {
  //first call to google, use passport authenticate.
  //Google redirects to the callback
  app.get(
    '/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
  );

  //Google redirects here and we authenticate the user and forward the user to their
  //profile page ono the UI
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/user-gifs');
    }
  );

  app.get('/api/current-user', (req, res) => {
    //check to see if user exists,
    //if so, send back 200
    //otherwise, send 404
    if (req.user) {
      res.send({id: req.user.id});
    } else {
      res.sendStatus(404);
    }
  });

  //Logs the user our of the service
  app.get('/api/current-user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
