// vendors
const mongoose = require('mongoose');

// locals
const { mgObjID, mgCreatedAt } = require('../utils');

const PurchaseSchema = new mongoose.Schema({
  ad: mgObjID('Ad'),
  user: mgObjID('User'),
  createdAt: mgCreatedAt
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
