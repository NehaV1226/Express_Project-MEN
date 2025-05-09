const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author');
    res.render('index/home', {
      blogs,
      user: req.session.user 
    });
  } catch (err) {
    res.status(500).send("Error loading blogs");
  }
});


router.get('/category/:cat', async (req, res) => {
  const blogs = await Blog.find({ category: req.params.cat });
  res.render('index/category', { blogs });
});

router.get('/welcome', (req, res) => res.render('index/welcome'));

module.exports = router;
