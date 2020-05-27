const jwt = require('jsonwebtoken');
require('dotenv').config();


// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      auth: false, message: 'User Not Authorized to access the Resource.',
    });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: `Fail to Authentication. Error -> ${err}`,
      });
    }
    req.userId = decoded.id;
    next();
  });
};


module.exports = {
  verifyToken,
};
