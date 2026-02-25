const UserModel = require('../models/user.model');
const crypto = require('crypto');
// const authRouter = express.Router();
const jwt = require('jsonwebtoken');
// const registerController = require('../Controllers/auth.controller');
 const bcrypt = require('bcryptjs');
 async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    // const isUserexistemail = await  UserModel.findOne({email});

    // if(isUserexistemail){
    //     return res.status(409).json({
    //         message:"User Already exist"
    //     })
    // }
    // const isUsername = await UserModel.findOne({username});

    // if(isUsername){
    //     return res.status(409).json({
    //         message:"User Already exist by Username"
    //     })
    // }

    const isUserAlreadyExist = await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]

    })
  if (isUserAlreadyExist) {
    return res.status(409)
    .json({
        message: "User already exists",
        email: isUserAlreadyExist.email === email
            ? "Email already exists"
            : "Username already exists"
    })
}

const hash = await bcrypt.hash(password,10);

const user = await UserModel.create({
    username,
    email,
    bio,
    profileImage,
    password:hash
})
const token = jwt.sign({
    id:user._id,
    username:user.username
},process.env.Jwt_SECRET)

res.cookie("token",token);

res.status(201).json({
    message:"User created",
    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
        profileImage:user.profileImage
    }
})
}


async function loginController(req, res){

    const { username, password } = req.body;

    // Find user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(404).json({
            message: "User Not Registered"
        });
    }

    // Hash password
    const hash = bcrypt.hash(password,10);

    // Compare password
    const isCompare = await bcrypt.compare(password,user.password);
    if (!isCompare) {
        return res.status(401).json({
            message: "Password Invalid"
        });
    }

    // Create token
    const token = jwt.sign(
        { id: user._id , username:user.username},
        process.env.JWT_SECRET
    );

    // Set cookie (NO properties)
    res.cookie("token", token);

    // Send response
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });

}

// async function getMeController(req,res){
//     const user = await User 
// }

  async function getMeController(req,res){
    const id = req.users.id;

    const user = await UserModel.findById(id);

    res.status(200).json({ 
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    }) 
  }

module.exports = {
    registerController,
    loginController,
    getMeController
}