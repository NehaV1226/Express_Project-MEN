const User = require('../models/user');

exports.signup = async (req, res) => {
  const { name, email, contact, password } = req.body;
  try {
    const user = await User.create({ name, email, contact, password });
    res.redirect('/auth/login');
  } catch (err) {
    res.send("Signup failed.");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.send("Invalid login.");
    }
  } catch (err) {
    res.send("Login error.");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};
