const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

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