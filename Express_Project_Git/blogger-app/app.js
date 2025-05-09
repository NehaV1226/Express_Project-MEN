const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 
const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const indexRoutes = require('./routes/index');

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourFallbackSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// GLOBAL MIDDLEWARE TO MAKE session AVAILABLE IN ALL VIEWS
app.use((req, res, next) => {
  res.locals.session = req.session || {};
  next();
});

// Set view engine and layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Layout middleware
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/', indexRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lavender-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
