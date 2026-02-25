const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
       username:{
        type:String,
        unique:[true,'User already exists'],
        required:[true,'Username required']
       },
       email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,'Email required']
       },
       password:{
        type:String,
        required:[true,'Password required']
       },
       bio:String,
       profileImage:{
        type:String,
        default:'https://ik.imagekit.io/ty3fpzlrw/userImage.avif'
       }
})

const UserModel = mongoose.model('users',UserSchema);

module.exports = UserModel