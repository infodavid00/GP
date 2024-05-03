const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
    try {
        const header = req.header('Authorization');
        if (!header) {
            return res.status(401).json({
                message: 'No authentication token provided.',
                details: 'Authorization header is missing. Please include a bearer token in your request headers.'
            });
        }

        const token = header.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message: 'No authentication token provided.',
                details: 'Please include a bearer token in your request headers.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed. User not found.',
                details: 'The token provided does not match any active user.'
            });
        }

        req.user = user;  // Now req.user is the whole user document
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Please authenticate.',
            details: error.message || 'Failed to process the authentication token.'
        });
    }
};

module.exports = auth;
