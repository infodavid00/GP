const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

module.exports = function(passport) {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
