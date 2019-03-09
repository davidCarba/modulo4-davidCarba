'use strict';

const Joi = require('joi');
const PostModel = require('../../../models/post-model');

async function validate(payload) {
  const schema = {
    content: Joi.string().min(5).max(1024).required(),
  };

  return Joi.validate(payload, schema);
}

async function post(req, res, next) {
  const postData = { ...req.body };
  const { uuid } = req.claims;

  try {
    await validate(postData);
  } catch (error) {
    res.status(400).send(error);
  }

  const data = {
    ownerUuid: uuid,
    authorUuid: uuid,
    content: postData.content,
    likes: [],
    comments: [],
    deletedAt: null,
  };

  try {
    const postCreated = await PostModel.create(data);
    return res.status(201).send(postCreated);
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = post;
