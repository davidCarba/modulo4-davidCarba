'use strict';

const express = require('express');
const multer = require('multer');
const getUserProfile = require('../controllers/user/get-user-profile');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const updateUserProfile = require('../controllers/user/update-user-profile');
const uploadUserAvatar = require('../controllers/user/upload-user-avatar');
const userPost = require('../controllers/user/user-post');
const userSearch = require('../controllers/user/search-user');

const upload = multer();
const router = express.Router();

router.get('/user', checkJwtToken, getUserProfile);
router.put('/user', checkJwtToken, updateUserProfile);
router.post('/user/avatar', checkJwtToken, upload.single('avatar'), uploadUserAvatar);
router.post('/user/post', checkJwtToken, userPost);
router.get('/user/search', checkJwtToken, userSearch);


module.exports = router;
