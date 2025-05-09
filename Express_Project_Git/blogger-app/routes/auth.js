const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', (req, res) => {
    res.render('auth/signup', {
      user: req.session.user || null // pass user or null
    });
  });
  
router.post('/signup', authController.signup);

router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
