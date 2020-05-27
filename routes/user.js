const express = require('express');

const router = express.Router();
const VerifyJWT = require('../middlewares/verifyJwtToken');

router.get('/profile', VerifyJWT.verifyToken);

module.exports = router;
