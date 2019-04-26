// vendors
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// locals
const { mgGetType, mgObjID, mgCreatedAt } = require('../utils');

const AdSchema = new mongoose.Schema({
  title: mgGetType(String),
  description: mgGetType(String),
  author: mgObjID('User'),
  price: mgGetType(Number),
  purchasedBy: {
    ...mgObjID('Purchase'),
    required: false
  },
  createdAt: mgCreatedAt
});

AdSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Ad', AdSchema);
