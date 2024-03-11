// models/user.js
const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName :{
    type : String,
    require  : false,
  },
  lastName :{
    type : String,
    require  : false,
  },
  phoneNumber :{
    type : String,
    require  : false,
  },
  address :{
    type : String,
    require  : false,
  }
});

// Hash the password before saving it
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await argon2.hash(user.password);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
