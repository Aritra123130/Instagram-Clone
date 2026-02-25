const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const likeModel = require('../models/like.model');
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function CreatePostController(req,res){
    // console.log(req.body,req.file);
    // const token =req.cookies.token;
    // console.log(token);
    // if(!token){
    //   return res.status(401).json({
    //     message:"User unauthorized access"
    //   })
    // }
    // let decoded = null;
    // try{
    //    decoded  = jwt.verify(token,process.env.JWT_SECRET);
    // }catch(err){
    //   return res.status(401).json({
    //     message:"User unauthorized"
    //   })
    // }
    // console.log(decoded.id);
    const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test"
  })

  // res.send(file);
   const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        users: req.users.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}

async function getPostController(req,res){
  // let token = req.cookies.token;
  // let decoded ; 
  // try{
  //   decoded = jwt.verify(token,process.env.JWT_SECRET);
  // }catch(err){
  //   return res.status(401).json({
  //     message:'User unauthorized'
  //   })
  // }
  const userid = req.users.id;
  let posts = await postModel.find({
    users:userid,

  })
  res.status(201).json({
    message:"Post fetched successfully",
    posts
  })
}

async function getPostDetailsController(req,res){
  // const token =  req.cookies.token;

  // if(!token){
  //   res.status(201).json({
  //     message:'User unauthorized',
  // })
  // }
  // let decoded;

  // try{
  //   decoded = jwt.verify(token,process.env.JWT_SECRET);
  // }catch(err){
  //   return res.status(401).json({
  //     // console.log('Invalid Token');
  //     message:'Invalid Token'
  //   })
  // }
  const userId = req.users.id
  let postId = req.params.postId;

  const post = await postModel.findById(postId);
  if(!post){
      return res.status(404).json({
            message: "Post not found."
        })
  }

      const isValidUser = post.users.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully.",
        post
    })

}

async function likePostController(req,res){
     const username = req.users.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}

async function getFeedController(req,res){
    const posts = await postModel.find().populate('users')

    res.status(200).json({
        message: "Feed fetched successfully.",
        posts
    })
}
module.exports  = {
    CreatePostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController

}