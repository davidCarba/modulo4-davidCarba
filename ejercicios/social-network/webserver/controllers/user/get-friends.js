'use strict';

const UserModel = require('../../../models/user-model');

async function getFriends(req, res, next) {
  const { uuid } = req.claims;

  const filter = {
    uuid,
  };

  const projection = {
    friends: 1,
    _id: 0,
  };

  try {
    const friendsResult = await UserModel.findOne(filter, projection);
    const friendsUuids = friendsResult.friends.map(f => f.uuid);

    const filterFriendData = {
      $and: [
        { uuid: { $in: friendsUuids } },
        { 'friends.rejectedAt': null },
      ],
    };
    const projectionFriendsData = {
      uuid: 1,
      fullName: 1,
      avatarUrl: 1,
      _id: 0,
    };

    const users = await UserModel.find(filterFriendData, projectionFriendsData).lean();
    return res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = getFriends;
