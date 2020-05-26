const express = require('express');
// eslint-disable-next-line no-unused-vars
const logger = require('morgan');

const routes = require('./routes');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
