const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

<<<<<<< HEAD
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  User.createUser(username, hashedPassword, (err, result) => {
    if (err) return res.status(500).send('Error registering user.');
    res.status(201).send('User registered');
  });
};

exports.login = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
});
=======
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
>>>>>>> 7bf3791cde50b566130a2a3ebdd5076e3b326317
