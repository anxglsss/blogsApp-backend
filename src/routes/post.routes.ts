import express from 'express'
import * as PostController from '../controllers/post.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { postValidator } from '../validators/post-validator'

export const postRouter = express.Router()

postRouter.post(
	'/create',
	authMiddleware,
	postValidator,
	PostController.createPost
)
postRouter.get('/getAll', PostController.getAll)
postRouter.get('/get/:id', PostController.getOnePost)
postRouter.delete('/delete/:id', authMiddleware, PostController.deletePost)
