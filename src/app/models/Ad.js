// vendors
const mongoose = require('mongoose');

// locals
const { mgGetType, mgObjID, mgCreatedAt } = require('../utils');

const AdSchema = new mongoose.Schema({
  title: mgGetType(String),
  description: mgGetType(String),
  author: mgObjID('User'),
  price: mgGetType(Number),
  createdAt: mgCreatedAt
});

module.exports = mongoose.model('Ad', AdSchema);
