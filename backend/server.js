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

// module.exports = app;




import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import 'dotenv/config';
import './config/passport.js';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import emailRoutes from './routes/email.js';
import translateRoutes from './routes/translate.js';

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://inshightflow.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.static('uploads'));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/translate', translateRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
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

export default app;



