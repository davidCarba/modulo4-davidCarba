'use strict';

async function getUserProfile(req, res, next) {
  return res.send(req.claims);
}

module.exports = getUserProfile;
