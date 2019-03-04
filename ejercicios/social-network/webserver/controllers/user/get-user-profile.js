'use strict';

const UserModel = require('../../../models/user-model');

async function getUserProfile(req, res, next) {
  const { claims } = req;

  try {
    const userDataProfile = await UserModel.findOne({ uuid: claims.uuid }, '-_id -__v').lean();
    console.log(userDataProfile);
    return res.status(200).send(userDataProfile);
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

module.exports = getUserProfile;
