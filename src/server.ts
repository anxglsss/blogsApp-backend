import { hash } from 'bcrypt'
import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import UserModel from './models/User'
import { registerValidator } from './validators/auth'

const app = express()
app.use(express.json())
const mongoURL: string =
	'mongodb+srv://madiyarabik111:h0sh1rama!@cluster0.edsmm.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'

mongoose
	.connect(mongoURL, {
		ssl: true,
	})
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((err: Error) => {
		console.error('MongoDB connection error:', err)
	})

app.post(
	'/auth/register',
	registerValidator,
	async (req: Request, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}

		try {
			const hashedPassword = await hash(req.body.password, 10)

			const doc = new UserModel({
				email: req.body.email,
				fullName: req.body.fullName,
				passwordHash: hashedPassword,
				avatarUrl: req.body.avatarUrl,
			})

			const user = await doc.save()
			res.json(user)
		} catch (error) {
			console.error('Ошибка при регистрации: ', error)
			res.status(500).json({
				success: false,
				message: 'Ошибка при регистрации пользователя',
			})
		}
	}
)

app.listen(4400, (err?: Error) => {
	if (err) return console.error(err)
	console.log('Server is listening on port 4400')
})
