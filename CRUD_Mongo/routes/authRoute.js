const express  = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');


router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
router.get('/UserData',AuthController.registrationData);
router.post('/refreshToken',AuthController.refreshTok)
// router.post('/deploy',AuthController.deploy)

module.exports = router;

