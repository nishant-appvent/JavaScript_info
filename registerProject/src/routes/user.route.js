const express = require('express');
const router = express.Router();
const valid = require('../validation/validation');
const auth = require('../authorisation/auth');


const  UserController= require('../controllers/user.controller');

router.get('/',(req,res)=>{res.send('On User Page');});

router.post('/register',valid.validationReg,UserController.registerUser);
router.post('/login',UserController.loginUser);
router.put('/login/personal',valid.validationPer,auth.authorization,UserController.personalDet);
router.put('/login/personal/address',valid.validationAddress,auth.authorization,UserController.addressDet);
router.put('/login/personal/address/degree',valid.validationDegree,auth.authorization,UserController.degreeDet);
router.get('/login/dashboard',auth.authorization,UserController.getUser);
router.get('/getallusers',auth.authorization,UserController.getAllUser);
router.post('/sendOtp',auth.authorization,UserController.sendOtp);
router.post('/verifyotp',auth.authorization,UserController.verifyOtp);
router.post('/sendpost',auth.authorization,UserController.sendPost);

module.exports = router;