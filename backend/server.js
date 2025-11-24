// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// require('dotenv').config();
// require('./config/passport');

// const authRoutes = require('./routes/auth');
// const postRoutes = require('./routes/posts');
// const userRoutes = require('./routes/users');
// const emailRoutes = require('./routes/email');
// const translateRoutes = require('./routes/translate');


// const app = express();

// // Middleware
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:5173',
//     'https://inshightflow.vercel.app'
//   ],
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.static('uploads'));
// app.use(passport.initialize());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/email', emailRoutes);
// app.use('/api/translate', translateRoutes);

// // Database connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Gemini AI Translation service enabled: ${!!process.env.GEMINI_API_KEY}`);
// });


// // Error handling middleware
// app.use((error, req, res, next) => {
//   console.error('Server error:', error);
//   res.status(500).json({
//     message: 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? error.message : undefined
//   });
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const emailRoutes = require('./routes/email');
const translateRoutes = require('./routes/translate');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://inshightflow.vercel.app',
    'https://https://personal-blog-platform-blush.vercel.app'

  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.static('uploads'));
app.use(passport.initialize());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Personal Blog Platform API',
    status: 'Running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/translate', translateRoutes);

// Handle 404 - FIXED: Remove the '*' parameter
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Gemini AI Translation service enabled: ${!!process.env.GEMINI_API_KEY}`);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});







