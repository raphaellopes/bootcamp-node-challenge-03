const mongoose = require('mongoose');

module.exports = {
  mgGetType: type => ({ type, required: true }),
  mgCreatedAt: {
    type: Date,
    default: Date.now
  },
  mgObjID: ref => ({
    type: mongoose.Schema.Types.ObjectID,
    ref,
    required: true
  })
};
