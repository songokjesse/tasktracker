const express = require('express');
// eslint-disable-next-line import/no-unresolved
const UserRoutes = require('./user');

const router = express.Router();
//
// router.get('/', (req, res, next) => {
//   // res.json({
//   //   message: 'Hello World',
//   // });
//   res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// eslint-disable-next-line no-unused-vars
router.get('/api/v1/', (req, res, next) => {
  // res.json({
  //   message: 'Hello World',
  // });
  res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use('/api/v1/users', UserRoutes);

module.exports = router;
