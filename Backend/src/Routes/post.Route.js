const express = require('express');
const multer = require('multer');
const upload = multer({storage:multer.memoryStorage()});
const postRouter = express.Router();
const identifyUser = require('../middlewires/auth.middlewires');
const PostController = require('../Controllers/post.controller')
postRouter.post('/',upload.single("image"),identifyUser,PostController.CreatePostController);

postRouter.get('/',identifyUser,PostController.getPostController);

postRouter.get("/details/:postId",identifyUser, PostController.getPostDetailsController)
postRouter.post('/like/:postId',identifyUser,PostController.likePostController)

postRouter.get('/feed',identifyUser,PostController.getFeedController);
module.exports = postRouter;