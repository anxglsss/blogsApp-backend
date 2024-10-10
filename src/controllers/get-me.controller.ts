import { Request, Response } from 'express'
import userModel from '../models/user.model'
interface CustomRequest extends Request {
	userId?: string
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
