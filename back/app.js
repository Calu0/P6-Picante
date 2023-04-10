const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const usersRoute = require('./routes/usersRoute');
const saucesRoute = require('./routes/saucesRoute')
const path = require('path');
const morgan = require('morgan');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://luca:picante9@cluster0.szqelaz.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(morgan('dev'))
app.use('/api/auth', usersRoute) 
app.use('/api/sauces', saucesRoute)
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;   