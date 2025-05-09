const Blog = require('../models/blog');

exports.createBlog = async (req, res) => {
  const { title, description, imageUrl, category } = req.body;
  try {
    await Blog.create({
      title, description, imageUrl, category,
      author: req.session.user._id
    });
    res.redirect('/');
  } catch (err) {
    res.send("Blog creation failed.");
  }
};

exports.viewBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author')
      .populate('comments.commentedBy');
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render('blog/view', { blog, session: req.session, title: blog.title });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.editBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.author.equals(req.session.user._id)) {
    res.render('blog/edit', { blog, title: "Edit Blog" });
  } else {
    res.redirect('/');
  }
};

exports.updateBlog = async (req, res) => {
  const { title, description, imageUrl, category } = req.body;
  await Blog.findByIdAndUpdate(req.params.id, { title, description, imageUrl, category });
  res.redirect('/blog/myblogs');
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/blog/myblogs');
};

exports.myBlogs = async (req, res) => {
  const blogs = await Blog.find({ author: req.session.user._id });
  res.render('blog/myblogs', { blogs, title: "My Blogs" });
};

exports.commentOnBlog = async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, {
    $push: {
      comments: {
        text: req.body.comment,
        commentedBy: req.session.user._id
      }
    }
  });
  res.redirect(`/blog/view/${req.params.id}`);
};
