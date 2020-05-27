const express = require('express');

const router = express.Router();
const VerifySignUp = require('../middlewares/verifySignUp');
const AuthenticationController = require('../controllers/AuthenticationController');

router.post('/signup', [VerifySignUp.checkDuplicateUserNameOrEmail], AuthenticationController.signup);
router.post('/login', AuthenticationController.login);

module.exports = router;
