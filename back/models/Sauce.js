const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true },
    manufacturer: {type: string, required: true},
    description: {type: string, required: true},
    mainPepper: {type: string, required: true},
    imageURL: {type: string, required: true},
    heat: {type: number, required: true},
    likes: {type: number, required: true},
    dislikes: {type: number, required: true},
    usersLiked: {type: string, required: true},
    userDisliked: {type: string, required: true}    
  });
  

  module.exports = mongoose.model('Sauce', SauceSchema); 