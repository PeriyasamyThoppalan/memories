import Mongoose  from "mongoose";

const postSchema=Mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

const PostMessage=Mongoose.model('PostMessage',postSchema);
export default PostMessage;