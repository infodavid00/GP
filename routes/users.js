const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('passport');
const isAuthenticated = require('../middlewares/isAuthenticated');

// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUserById);
// router.delete('/:id', userController.deleteUserById);
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/info',  isAuthenticated , userController.getUserInfo)
// router.put('/editprofile',  isAuthenticated , userController.editProfile)

module.exports = router;
