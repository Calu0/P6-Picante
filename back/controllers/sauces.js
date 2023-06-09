const Sauce = require('../models/Sauce')
const fs = require('fs')


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.getSingleSauce = (req, res, next) => {
    const id = req.params.id
    Sauce.findOne({
        _id: id
    })
        .then((sauce) => { res.status(200).json(sauce) })
        .catch((error) => { res.status(400).json({ error }) })
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
            res.status(201).json({ message: 'Nouvelle sauce mise en ligne!' })
            return;
        })

        .catch(error => res.status(400).json({ error }));
}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObject._userId;

    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                if (req.file) {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                            .catch(error => res.status(401).json({ error }))
                    })
                }
                else {
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                        .catch(error => res.status(401).json({ error }))
                }
            }
        }
        )
        .catch((error) => {
            res.status(400).json({ error });
        });
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Sauce supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}

exports.like = (req, res, next) => {

    const likeObject = JSON.parse(req.body.like)
    const id = req.auth.userId

    if (likeObject === 1) {
        Sauce.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: id } })
            .then((sauce) => {
                sauce.save()
                    .then(() => { res.status(200).json({ message: 'Vote pris en compte !' }) })
                    .catch(error => res.status(401).json({ error }));
            })
            .catch(error => res.status(400).json({ error }))

    }
    else if (likeObject === -1) {
        Sauce.findOneAndUpdate({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: id } })
            .then((sauce) => {
                sauce.save()
                    .then(() => { res.status(200).json({ message: 'Vote pris en compte !' }) })
                    .catch(error => res.status(401).json({ error }));
            })
            .catch(error => res.status(400).json({ error }));
    }
    else {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                const existingLiked = sauce.usersLiked.find((existingLiked) => existingLiked == id)
                const existingDisliked = sauce.usersDisliked.find((existingDisliked) => existingDisliked == id)
                if (existingLiked) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: id } })
                        .then(() => { res.status(200).json({ message: 'Vote supprimé!' }) })
                        .catch(error => res.status(401).json({ error }));

                }
                else if (existingDisliked) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: id } })
                        .then(() => { res.status(200).json({ message: 'Vote supprimé!' }) })
                        .catch(error => res.status(401).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }))
    }
}

