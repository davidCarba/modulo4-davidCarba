'use strict';

const Joi = require('joi');
const UserModel = require('../../../models/user-model');

async function validate(payload) {
  const schema = {
    text: Joi.string().min(3).required(),
  };

  return Joi.validate(payload, schema);
}

async function search(req, res, next) {
  const { text } = req.query;

  try {
    await validate({ text });
  } catch (error) {
    res.status(400).send(error);
  }

  try {
    const user = await UserModel.find({ $text: { $search: text } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }, '-_id -__v').lean();

    const usersMinimunInfo = user.map((userResult) => {
      const {
        uuid,
        fullName,
        avatarUrl,
        score,
      } = userResult;

      return {
        uuid,
        fullName,
        avatarUrl,
        score,
      };
    });

    return res.status(200).send(usersMinimunInfo);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = search;
