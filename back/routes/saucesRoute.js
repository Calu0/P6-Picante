const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const saucesCtrl = require(`../controllers/sauces`)



router.get('',auth, saucesCtrl.getAllSauces);

router.get('/:id',auth, saucesCtrl.getSingleSauce);

router.post('',auth, multer, saucesCtrl.newSauce)

router.put('/:id',auth, saucesCtrl.modifySauce)

router.delete('/:id',auth, saucesCtrl.deleteSauce)

router.post('/:id/like',auth, saucesCtrl.like)

module.exports = router;