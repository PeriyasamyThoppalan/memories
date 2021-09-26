import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
export const getPosts = async (req,res) => {
    
    try {
        const postMessages= await PostMessage.find();
        res.status(200).json(postMessages);
        
    } catch (error) {
        res.status(404).json({error})
    }
};

export const createPost =  async (req,res)=>{
    const post =req.body;
    //const newPost = new PostMessage(post);
    const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
};
// posts/123
export const updatePost = async (req,res) =>{
    const {id}=req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    console.log('id from updatePost API', id);
    
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);

  } catch (error) {
      res.status(406).send("Error while updating the post : "+error.message);
  }  
};

export const deletePost = async (req,res) =>{
    const {id}=req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status('404').send('Invalid record to delete');
    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Record is deleted'});          
    
};

export const likePost = async (req,res) =>{
    const {id} = req.params;
    console.log('BE : Inside likePost controller');
    console.log(req);

    //
    if(!req.userId) return res.json({message:'Unauthenticated user'});
    //

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status('404').send('Invalid record to like');

    const post= await PostMessage.findById(id);
    let updPost;
    //
    const index=post.likes.findIndex((id)=> id===String(req.userId));
    const userid=req.userId;
    if(index === -1){
        console.log('like post: Not liked before '+ post );
        //the user is not liked the post before. hence like the post i.e just pushing the id into the likes
        post.likes.push(req.userId);
        post.likeCount+=1;
        updPost=post;

    }else{
        //user has already liked the post before. delike the post. It filters out the id from the likes array object in the post.
        post.likes=post.likes.filter((likedUserId)=> likedUserId !== userid);        
        post.likeCount>0 ? post.likeCount-=1:post.likeCount=0;
        updPost=post;
        
    }
    //
    //const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});    
    const updatedPost = await PostMessage.findByIdAndUpdate(id,updPost,{new:true});
    console.log('updated post after like: '+ updatedPost );
   res.json(updatedPost);
}