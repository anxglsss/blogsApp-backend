import { hash } from 'bcrypt'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'
import { UserDTO } from '../types/user.dto'

export const register = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(errors.array())
	}

	try {
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
		const userData = user.toObject()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret',
			{ expiresIn: '30d' }
		)
		const { passwordHash, ...userWithoutPassword } = userData

		res.json({ token })
	} catch (error) {
		console.error('Ошибка при регистрации: ', error)
		res.status(500).json({
			success: false,
			message: 'Ошибка при регистрации пользователя',
		})
	}
}
