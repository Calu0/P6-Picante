const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Log = require('./models/Log');

app.use(express.json());

mongoose.connect('mongodb+srv://luca:picante9@cluster0.szqelaz.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/auth/signup', (req, res, next) => {
    delete req.body._id;
    const log = new Log({
        ...req.body
    });
    log.save()
        .then(() => res.status(201).json({ message: 'Nouveau utilisateur enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});


app.get(`/api/sauces`, (req, res) => {

    res.json({ message: `sauces` })
}
);

module.exports = app;   