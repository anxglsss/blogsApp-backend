import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'
import { UserDTO } from '../types/user.dto'

export const login = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json({
				message: 'User not found!',
			})
		}

		const userDto = new UserDTO(user.email, user.fullName, user.avatarUrl)

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

		res.json({ token })
	} catch (error) {
		console.error('Error while login: ', error)
		res.status(500).json({ message: 'Error while login' })
	}
}
