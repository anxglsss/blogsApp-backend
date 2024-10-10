import { Request, Response } from 'express'
import postModel from '../models/post.model'
import { CreatePostDTO } from '../types/create-post.dto'

interface CustomRequest extends Request {
	userId?: string
}

export const getAll = async (req: Request, res: Response) => {
	try {
		const posts = await postModel
			.find()
			.populate('user', 'fullName email')
			.exec()
		res.json(posts)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Server error' })
	}
}

export const createPost = async (req: CustomRequest, res: Response) => {
	try {
		const user = req.userId
		const post = new CreatePostDTO(
			req.body.title,
			req.body.content,
			req.body.tags,
			req.body.imageUrl
		)

		const doc = new postModel({
			title: post.title,
			content: post.content,
			tags: post.tags,
			imageUrl: post.imageUrl,
			user: user,
		})
		await doc.save()

		res.json(post)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Server error' })
	}
}

export const getOnePost = async (req: Request, res: Response) => {
	try {
		const post = await postModel
			.findOneAndUpdate(
				{
					_id: req.params.id,
				},
				{
					$inc: { views: 1 },
				},
				{
					new: true,
				}
			)
			.populate('user', 'fullName email')
			.exec()
		if (!post) return res.status(404).json({ message: 'Post not found' })

		res.json(post)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Server error' })
	}
}

export const deletePost = async (req: Request, res: Response) => {
	try {
		const post = await postModel.findByIdAndDelete(req.params.id)
		if (!post) return res.status(404).json({ message: 'Post not found' })
		res.json({ success: true, message: 'Post deleted' })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Server error' })
	}
}
