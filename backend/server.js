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


// export default app;









const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// Basic middleware first
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple CORS for initial setup
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://inshightflow.vercel.app',
    'https://personal-blog-platform-blush.vercel.app'
  ],
  credentials: true
}));

// Test route - should work even without DB
app.get('/', (req, res) => {
  res.json({
    message: 'Personal Blog Platform API is running!',
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check without DB dependency
app.get('/api/health', (req, res) => {
  res.json({
    message: 'API is healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Initialize Passport only if we have the config
try {
  require('./config/passport');
  app.use(passport.initialize());
  console.log('✅ Passport initialized');
} catch (error) {
  console.log('⚠️ Passport config not available, continuing without auth');
}

// Database connection with timeout
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found in environment variables');
      return;
    }

    console.log('🔗 Attempting MongoDB connection...');
    
    // MongoDB connection with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('MongoDB connection timeout')), 10000)
    );

    const connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    await Promise.race([connectionPromise, timeoutPromise]);
    console.log('✅ MongoDB connected successfully');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Don't crash the app - continue without DB
  }
};

// Connect to DB (but don't block startup)
connectDB().catch(console.error);

// Import routes only after basic setup
let authRoutes, postRoutes, userRoutes, emailRoutes, translateRoutes;

try {
  authRoutes = require('./routes/auth');
  postRoutes = require('./routes/posts');
  userRoutes = require('./routes/users');
  emailRoutes = require('./routes/email');
  translateRoutes = require('./routes/translate');
  
  // Mount routes
  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/email', emailRoutes);
  app.use('/api/translate', translateRoutes);
  
  console.log('✅ All routes mounted successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
  
  // Provide basic API endpoints even if routes fail to load
  app.get('/api/posts', (req, res) => {
    res.json({ 
      message: 'Posts API is initializing...',
      posts: [],
      currentPage: 1,
      totalPages: 1,
      totalPosts: 0
    });
  });
}

// Simple 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    availableEndpoints: ['/', '/api/health', '/api/posts', '/api/auth']
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

// For local development only
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;