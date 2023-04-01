const express = require('express');
const router = express.Router();
const userCtrl = require(`../controllers/users`)



//Sign up 

router.post('/signup', userCtrl.signUp);

//login

router.post('/login', userCtrl.login)

module.exports = router;
