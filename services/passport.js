const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const {name, emails, photos, id} = profile;

      console.log(name, id, emails, photos);
      //User already exists
      const existingUser = await User.findOne({googleId: id});

      if (existingUser) {
        return done(null, existingUser);
      }

      let email = 'N/A',
        photoLink = 'N/A';

      //todo: only grabs the last one, refactor
      if (emails && emails.length > 0) {
        emails.forEach(emailLoop => {
          if (emailLoop.value && emailLoop.verified) {
            email = emailLoop.value;
          }
        });
      }

      //todo: only grabs the last one, refactor
      if (photos && photos.length > 0) {
        photos.forEach(photo => {
          if (photo.value) {
            photoLink = photo.value;
          }
        });
      }

      //User doesn't exist so we create one
      const user = await new User({
        googleId: profile.id,
        firstName: name.givenName,
        lastName: name.familyName,
        email: email,
        photoLink: photoLink
      }).save();
      done(null, user);
    }
  )
);
