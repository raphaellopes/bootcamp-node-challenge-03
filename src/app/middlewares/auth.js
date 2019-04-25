// vendors
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// locals
const authConfig = require('../../config/auth');
const { errorMessage } = require('../utils');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json(errorMessage('Token not provided'));
  }

  const [, token] = authHeader.split(' ');

  try {
    // jwt needs `promisify` to use async await sintax
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json(errorMessage('Token is invalid'));
  }
};
