// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User');

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/api/auth/google/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });
    
//     if (user) {
//       return done(null, user);
//     }

//     // Create new user if doesn't exist
//     user = await User.create({
//       googleId: profile.id,
//       username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.random().toString(36).substr(2, 5),
//       email: profile.emails[0].value,
//       avatar: profile.photos[0].value
//     });

//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });



const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://personal-blog-platform-blush.vercel.app/api/auth/google/callback"
    : "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }

    // Check if user exists with the same email (to link accounts)
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Link Google account to existing email/password account
      user.googleId = profile.id;
      if (!user.avatar) user.avatar = profile.photos[0].value;
      if (!user.isVerified) user.isVerified = true;
      await user.save();
      return done(null, user);
    }

    // Create new user if doesn't exist
    const username = await generateUniqueUsername(profile.displayName);
    
    user = await User.create({
      googleId: profile.id,
      username: username,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      isVerified: true
    });

    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Helper function to generate unique username
async function generateUniqueUsername(displayName) {
  const baseUsername = displayName
    .replace(/\s+/g, '')
    .toLowerCase()
    .substring(0, 15);
  
  let username = baseUsername;
  let counter = 1;
  
  while (await User.findOne({ username })) {
    username = `${baseUsername}${counter}`;
    counter++;
  }
  
  return username;
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});