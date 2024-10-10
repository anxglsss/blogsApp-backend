import bcrypt, { hash } from 'bcrypt'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import {
	default as UserModel,
	default as userModel,
} from '../models/user.model'
import { UserDTO } from '../types/create-user.dto'

interface CustomRequest extends Request {
	userId?: string
}

export const login = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json({
				message: 'User not found!',
			})
		}

		const userData = user.toObject()
		const isValidPassword = await bcrypt.compare(
			req.body.password,
			userData.passwordHash
		)

		if (!isValidPassword) {
			return res.status(400).json({
				message: 'Invalid login or password',
			})
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret',
			{ expiresIn: '30d' }
		)
		const { passwordHash, ...userWithoutPassword } = userData

		res.json({ token, ...userWithoutPassword })
	} catch (error) {
		console.error('Error while login: ', error)
		res.status(500).json({ message: 'Error while login' })
	}
}

export const register = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
			message: 'Validation failed',
		})
	}

	try {
		const existingUser = await UserModel.findOne({ email: req.body.email })
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: 'A user with this email already exists.',
			})
		}

		const hashedPassword = await hash(req.body.password, 10)

		const userDto = new UserDTO(
			req.body.email,
			req.body.fullName,
			req.body.avatarUrl
		)

		const doc = new UserModel({
			email: userDto.email,
			fullName: userDto.fullName,
			passwordHash: hashedPassword,
			avatarUrl: userDto.avatarUrl,
		})

		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret',
			{ expiresIn: '30d' }
		)

		res.json({ token, ...userDto })
	} catch (error) {
		console.error('Ошибка при регистрации: ', error)
		res.status(500).json({
			success: false,
			message: 'Ошибка при регистрации пользователя',
		})
	}
}
export const getMe = async (req: CustomRequest, res: Response) => {
	try {
		const user = await userModel.findById(req.userId)

		if (!user) return res.status(403).json({ message: 'Not found user' })

		const { passwordHash, ...userWithoutPassword } = user.toObject()
		res.json(userWithoutPassword)
	} catch (error) {
		return res.status(403).json({
			message: 'Not access',
		})
	}
}
