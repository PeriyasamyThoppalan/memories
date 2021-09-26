import express from 'express';

import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

//instance of a router
const router=express.Router();

router.get('/',getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);

//calling auth before updatePost and deletePost can be handled in the client side. We will implement auth before likePost in the backend.
export default router;