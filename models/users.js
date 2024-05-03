const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Matches correct email format
      },
      message: props => `${props.value} is not a valid email address.`
    }
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses', default: [] }],
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;