import { Router } from 'express';
import { createPost, getPosts, getPostById } from '../controllers/posts.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const postsRouter = Router();

postsRouter.post('/create-post', authenticate, createPost);
postsRouter.get('/getposts', getPosts);
postsRouter.get('/getpost/:id', getPostById);


export default postsRouter;