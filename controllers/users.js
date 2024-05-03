const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// const deleteUserById = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const user = new User({
      email,
      password,
      username
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
  // getUserById,
  // updateUserById,
  // deleteUserById,
  register,
  login
};
