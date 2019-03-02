'use strict';

const express = require('express');
const getUserProfile = require('../controllers/user/get-user-profile');
const checkJwtToken = require('../controllers/session/check-jwt-token');

const router = express.Router();

router.get('/user', checkJwtToken, getUserProfile);

module.exports = router;
