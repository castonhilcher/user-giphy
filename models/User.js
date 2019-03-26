const mongoose = require('mongoose');
const {Schema} = mongoose;
const GifSchema = require('./GifSchema');

//Data model for Mongoose/Mongo DB
const UserSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  photoLink: String,
  favoriteGifs: [GifSchema]
});

mongoose.model('users', UserSchema);
