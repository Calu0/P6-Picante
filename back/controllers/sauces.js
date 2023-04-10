const Sauce = require('../models/Sauce')
const jwt = require('jsonwebtoken')


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces =>  res.status(200).json(sauces))
    .catch(error =>  res.status(400).json({ error })); 
}

exports.getSingleSauce = (req, res, next) => {
    const id = req.params.id
    Sauce.findOne({
        _id : id
    })
    .then((sauce) => {res.status(200).json(sauce)})
    .catch((error) => {res.status(400).json({error})})
}

exports.newSauce = (req, res, next) => {
 const sauceObject = JSON.parse(req.body.sauce)
 delete sauceObject._id;
 delete sauceObject._userId;
        const sauce = new Sauce({  
            ...sauceObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        });
        sauce.save()  
            .then(() => {         
                res.status(201).json({ message: 'Nouvelle sauce mise en ligne!'})
                return;    
        })
        
            .catch(error => res.status(400).json({error}));
}

exports.modifySauce = (req, res, next) => {

}

exports.deleteSauce = (req, res, next) => {

}

exports.like = (req, res, next) => {

}