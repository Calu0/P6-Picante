const User = require('../models/User');
const bcrypt = require(`bcrypt`);
const jwt = require('jsonwebtoken');

// enregistrement d'un utilisateur au signup 
// envoi des données vers la base de donnée

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({  
            email : req.body.email,
            password : hash
        });
        user.save()  
            .then(() => {         
                res.status(201).json({ message: 'Nouveau utilisateur enregistré !'})
                console.log(user);
                return;    
        })
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({error}));
}

//Login

exports.login = (req, res, next) => {
    User.findOne({ email : req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur introuvable'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

