const mongoose = require('mongoose');
const {Schema} = mongoose;

//Data model for Mongoose/Mongo DB
const GifSchema = new Schema({
  id: String,
  categories: [String]
});

mongoose.model('gifs', GifSchema);
