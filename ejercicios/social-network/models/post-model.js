'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({

  ownerUuid: String, // uuid
  authorUuid: String, // uuid
  content: String,
  createdAt: Date,
  comments: [{
    author: String, // uuid
    comment: String,
    createdAt: [{
      type: Date,
      default: Date.now,
    }],
  }],
  likes: [String], // uuid
  deletedAt: Date,

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
