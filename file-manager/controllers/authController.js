const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

const authController = {
  register: async (req, res) => {
    const { username, email, password, languagePreference } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(username, email, hashedPassword, languagePreference);
    res.redirect('/login');
  },
  login: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  }
};

module.exports = authController;