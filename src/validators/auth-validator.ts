import { body } from 'express-validator'

export const registerValidator = [
	body('email', 'Email is not valid!').isEmail(),
	body('fullName', 'Full name is not valid!').isLength({ min: 3, max: 30 }),
	body('password', 'Password is not valid!').isLength({ min: 5, max: 20 }),
	body('avatarUrl', 'Avatar URL is not valid!').optional().isURL(),
]
