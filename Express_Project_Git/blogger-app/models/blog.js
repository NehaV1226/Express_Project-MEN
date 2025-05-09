const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [
    {
      text: String,
      commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      commentedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
