// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
