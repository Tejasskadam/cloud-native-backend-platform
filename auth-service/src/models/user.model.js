const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  refreshToken: String,
  tokenVersion: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
