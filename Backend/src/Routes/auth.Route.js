const express = require('express');
const UserModel = require('../models/user.model');
const crypto = require('crypto');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const registerController = require('../Controllers/auth.controller');
const identifyUser = require('../middlewires/auth.middlewires');

authRouter.post('/register',registerController.registerController)

authRouter.post('/login', registerController.loginController);

authRouter.get('/getme',identifyUser, registerController.getMeController);
module.exports  = authRouter;