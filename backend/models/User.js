// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 30
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: function() {
//       return !this.googleId; // Password not required for Google auth
//     }
//   },
//   avatar: {
//     type: String,
//     default: ''
//   },
//   googleId: {
//     type: String,
//     sparse: true
//   },
//   bio: {
//     type: String,
//     maxlength: 500
//   }
// }, {
//   timestamps: true
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password') || !this.password) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   if (!this.password) return false;
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Remove password from JSON output
// userSchema.methods.toJSON = function() {
//   const user = this.toObject();
//   delete user.password;
//   return user;
// };

// module.exports = mongoose.model('User', userSchema);





const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password not required for Google auth
    }
  },
  avatar: {
    type: String,
    default: ''
  },
  googleId: {
    type: String,
    sparse: true
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: function() {
      // Auto-verify Google OAuth users, email/password users start unverified
      return !!this.googleId;
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified and exists
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if user has password set
userSchema.methods.hasPassword = function() {
  return !!this.password;
};

// Check if user is Google OAuth user
userSchema.methods.isGoogleUser = function() {
  return !!this.googleId;
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this.username;
});

// Static method to find or create Google user
userSchema.statics.findOrCreateGoogleUser = async function(profile) {
  try {
    // First, try to find by Google ID
    let user = await this.findOne({ googleId: profile.id });
    if (user) return user;

    // Then, try to find by email and link accounts
    user = await this.findOne({ email: profile.emails[0].value });
    if (user) {
      // Link Google account to existing user
      user.googleId = profile.id;
      user.isVerified = true; // Verify when linking with Google
      if (!user.avatar && profile.photos[0].value) {
        user.avatar = profile.photos[0].value;
      }
      await user.save();
      return user;
    }

    // Create new Google user
    const baseUsername = profile.displayName
      .replace(/\s+/g, '')
      .toLowerCase()
      .substring(0, 15);

    let username = baseUsername;
    let counter = 1;
    
    // Ensure unique username
    while (await this.findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    user = await this.create({
      googleId: profile.id,
      username: username,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value || '',
      isVerified: true // Google users are automatically verified
    });

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);