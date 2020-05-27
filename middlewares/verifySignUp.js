const models = require('../models');

// eslint-disable-next-line no-unused-vars
const checkDuplicateUserNameOrEmail = (req, res, next) => {
  // -> Check Email is already in use
  models.User.findOne({
    where: {
      email: req.body.email,
    },
    // eslint-disable-next-line no-shadow
  }).then((user) => {
    if (user) {
      res.status(400).send({
        Fail: 'User already Exists!',
      });
      return;
    }

    next();
  });
};

module.exports = {
  checkDuplicateUserNameOrEmail,
};
