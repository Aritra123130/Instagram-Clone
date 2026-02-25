const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
    type:String,
    required:[true,"It is required for creating a post"]
    },
    users:{
           type:mongoose.Schema.Types.ObjectId,
        ref:"users",
     
        required:[true,"User ID is required for creating the post"]
    }
})

const postModel = mongoose.model('posts',PostSchema);

module.exports = postModel;