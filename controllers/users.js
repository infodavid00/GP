const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// const editProfile = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user._id, req.body);
//     res.status(200).json({ message: 'User updated successfully', user: user });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' , origin : error.message});
//   }
// };



const getUserInfo = async (req, res) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, username, gender, bio, age, address } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid email format',
        details: 'Please enter a valid email address'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: 'Email already exists',
        details: 'Please choose a different email address'
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        code: 400,
        message: 'Username already exists',
        details: 'Please choose a different username'
      });
    }

    const user = new User({
      email,
      password,
      username,
      gender,
      age,
      bio,
      address
    });

    await user.save();

    res.status(200).json({
      message: "Registration successful"
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        details: 'No user found with the provided email'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid credentials',
        details: 'Password does not match'
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      message: 'Logged in successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getUserInfo
};


// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const updateUserById = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body);
//     res.status(200).json({ message: 'User updated successfully', user: user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
