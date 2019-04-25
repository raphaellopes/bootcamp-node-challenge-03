// vendors
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// locals
const authConfig = require('../../config/auth');
const { mgGetType, mgCreatedAt } = require('../utils/mongo');

const UserSchema = new mongoose.Schema({
  name: mgGetType(String),
  email: {
    ...mgGetType(String),
    unique: true,
    lowercase: true
  },
  password: mgGetType(String),
  createdAt: mgCreatedAt
});

// save hook is used on create or update
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

// Used to all instances
UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password);
  }
};

// statics dont need a instace to be exec
UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    });
  }
};

module.exports = mongoose.model('User', UserSchema);
