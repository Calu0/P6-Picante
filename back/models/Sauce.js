const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true },
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageURL: {type: String},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true, default: 0},
    dislikes: {type: Number, required: true, default: 0},
    usersLiked: {type: Array, required: true, default: []},
    userDisliked: {type: Array, required: true, default: []}
  });
  

  module.exports = mongoose.model('Sauce', SauceSchema); 