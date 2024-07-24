module.exports = (req, res, next) => {
    // Authentication logic
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };  