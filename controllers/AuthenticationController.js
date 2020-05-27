const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-unresolved
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const models = require('../models');
require('dotenv').config();

const salt = 10;
const signup = [
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 }),
  // eslint-disable-next-line no-unused-vars,consistent-return
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    }).then(
      (user) => res.status(201).send(user),
    ).catch((err) => res.status(500).send(`Error -> ${err}`));
  },
];
// eslint-disable-next-line no-unused-vars
const login = (req, res, next) => {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
    // eslint-disable-next-line consistent-return
  }).then((user) => {
    // Check if user entered wrong email
    if (!user) {
      // eslint-disable-next-line no-console
      console.log(user);
      return res.status(400).send({
        status: 400,
        message: 'Wrong User Login Details!',
      });
    }
    // Check if user entered wrong password
    const ValidPassword = bcrypt.compareSync(req.body.password, user.password);
    // Display error message if user password is wrong
    if (!ValidPassword) {
      return res.status(401).json({ auth: false, accessToken: null, reason: 'Wrong User Login Details!' });
    }
    // Set the JWT token & Expiry
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    // return token with a success status
    return res.status(200).send({ auth: true, accessToken: token });
  }).catch((err) => res.status(500).send(`Error -> ${err}`));
};

module.exports = {
  signup,
  login,
};
