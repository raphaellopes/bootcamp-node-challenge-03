const mongo = require('./mongo');

module.exports = {
  ...mongo,
  errorMessage: error => ({ error })
};
