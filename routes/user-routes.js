const mongoose = require('mongoose');
const requireAuth = require('../middlewares/incoming-auth');

//Import our models
const Users = mongoose.model('users');

module.exports = app => {
  //Get the logged in user information
  app.get('/api/current-user/:userId', requireAuth, (req, res) => {
    Users.findById(req.user.id, (err, user) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const {id, firstName, lastName, email, photoUrl} = user;

        res.send({id, firstName, lastName, email, photoUrl});
      }
    });
  });

  //add a new favorite gif for the current user
  app.post('/api/current-user/:userId/gifs', requireAuth, (req, res) => {
    if (!req.body || !req.body.id) {
      res.sendStatus(400);
    }

    let {id, categories} = req.body;

    if (!categories) categories = [];

    Users.findByIdAndUpdate(
      req.user.id,
      {$push: {favoriteGifs: {id, categories}}},
      {new: true},
      (err, user) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  //get a list of the favorite gifs by user
  app.get('/api/current-user/:userId/gifs', requireAuth, (req, res) => {
    Users.findById(req.user.id, 'favoriteGifs', (err, user) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(user.favoriteGifs);
      }
    });
  });

  //remove a favorite from the list of gifs
  //It returns 200 even if it cant find one (clean up, but essentially the task is done)
  app.delete(
    '/api/current-user/:userId/gifs/:gifId',
    requireAuth,
    (req, res) => {
      let {userId, gifId} = req.params;

      Users.findById(userId, 'favoriteGifs', {new: true}, (err, user) => {
        if (err) {
          res.sendStatus(500);
        } else {
          user.favoriteGifs = user.favoriteGifs.filter(gif => gif.id !== gifId);
          user.save();
          res.sendStatus(200);
        }
      });
    }
  );
};
