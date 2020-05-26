const express = require('express');
// eslint-disable-next-line no-unused-vars
const logger = require('morgan');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  required: false,
  auth0Logout: true,
  appSession: {
    secret: process.env.AUTH0_SECRET,
  },
  baseURL: 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: 'https://dev-cybs19sl.auth0.com',
};

const routes = require('./routes');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use('/', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(err.status || 500);
  const data = {
    message: err.message,
    error: err,
  };
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('error', data);
  }
});

module.exports = app;
