const Sauce = require('../models/Sauce')
const jwt = require('jsonwebtoken')

exports.getAllSauces = (req, res, next) => {

}

exports.getSingleSauce = (req, res, next) => {

}

exports.newSauce = (req, res, next) => {
 const sauceObject = JSON.parse(req.body.sauce)
        const sauce = new Sauce({  
            ...sauceObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        sauce.save()  
            .then(() => {         
                res.status(201).json({ message: 'Nouvelle sauce mise en ligne!'})
                console.log(sauce);
                return;    
        })
        
    .catch(error => res.status(500).json({error}));
}

exports.modifySauce = (req, res, next) => {

}

exports.deleteSauce = (req, res, next) => {

}

exports.like = (req, res, next) => {

}