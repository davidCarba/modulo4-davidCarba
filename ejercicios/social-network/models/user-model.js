'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
  },
  friends: [{
    createdAt: Date,
    confirmedAt: Date,
    rejectedAt: Date,
    uuid: String,
  }],
  avatarUrl: String,
  fullName: String,
  preferences: {
    isPublicProfile: Boolean,
    linkedIn: String,
    twitter: String,
    github: String,
    description: String,
  },
});

userSchema.index(
  {
    fullName: 'text',
    'preferences.linkedin': 'text',
    'preferences.twitter': 'text',
    'preferences.github': 'text',
  },
);

// var Tank = mongoose.model('Tank', schema);
const User = mongoose.model('User', userSchema);

module.exports = User;
