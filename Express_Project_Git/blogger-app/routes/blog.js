const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) return res.redirect('/auth/login');
  next();
};

router.get('/create', isLoggedIn, (req, res) => res.render('blog/create'));
router.post('/create', isLoggedIn, blogController.createBlog);

router.get('/view/:id', blogController.viewBlog);
router.post('/comment/:id', isLoggedIn, blogController.commentOnBlog);

router.get('/edit/:id', isLoggedIn, blogController.editBlog);
router.post('/edit/:id', isLoggedIn, blogController.updateBlog);

router.get('/delete/:id', isLoggedIn, blogController.deleteBlog);

router.get('/myblogs', isLoggedIn, blogController.myBlogs);

module.exports = router;
