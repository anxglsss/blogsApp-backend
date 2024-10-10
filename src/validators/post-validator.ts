import { body } from 'express-validator'

export const postValidator = [
	body('title', 'Title is not valid!').isLength({ min: 3, max: 30 }),
	body('content', 'Content is not valid!').isLength({ min: 3, max: 100 }),
	body('tags').isArray(),
	body('imageUrl').optional().isURL(),
]
