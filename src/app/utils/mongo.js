const { Schema: { Types: { ObjectId } } } = require('mongoose');

module.exports = {
  mgGetType: type => ({ type, required: true }),
  mgCreatedAt: {
    type: Date,
    default: Date.now
  },
  mgObjID: ref => ({
    type: ObjectId,
    ref,
    required: true
  })
};
