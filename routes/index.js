const express = require('express');
// eslint-disable-next-line import/no-unresolved
const UserRoutes = require('./user');
const AuthRoutes = require('./authentication');

const router = express.Router();
//
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World',
  });
});


router.use('/api/v1/users', UserRoutes);
router.use('/api/v1/auth', AuthRoutes);

module.exports = router;
