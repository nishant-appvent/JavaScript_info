const express = require('express');
const router = express.Router();
const valid = require('../validation/validation');


const  UserController= require('../controllers/user.controller');

router.get('/',(req,res)=>{res.send('On User Page');});

router.post('/register',valid,UserController.registerUser);
router.post('/login',UserController.loginUser);
router.put('/login/:id',UserController.personalDet);


module.exports = router;