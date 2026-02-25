const express = require('express');

const userRouter = express.Router();

const followController = require('../Controllers/user.controller');
const identifyUser = require('../middlewires/auth.middlewires');

userRouter.post('/follow/:username',identifyUser,followController.followUserController);

userRouter.post('/unfollow/:username',identifyUser,followController.unfollowUserController)
module.exports = userRouter;