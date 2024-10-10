import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { authMiddleware } from './middlewares/auth.middleware'
import userModel from './models/user.model'
import { authRouter } from './routes/auth.routes'

const app = express()
app.use(express.json())

const mongoURL: string =
	'mongodb+srv://madiyarabik111:h0sh1rama!@c1.edsmm.mongodb.net/?retryWrites=true&w=majority&appName=c1'

mongoose
	.connect(mongoURL)
	.then(() => {
		console.log('Connected to MongoDB!')
	})
	.catch((err: Error) => {
		console.error('MongoDB connection error: ', err)
	})

app.use('/auth', authRouter)

// Define interface to extend Request with userId
interface CustomRequest extends Request {
	userId?: string
}

app.get(
	'/auth/me',
	authMiddleware,
	async (req: CustomRequest, res: Response) => {
		try {
			// Use userId from request set by the middleware
			const user = await userModel.findById(req.userId)

			if (!user) return res.status(403).json({ message: 'Not found user' })

			// Safely exclude the password before sending the response
			const { passwordHash, ...userWithoutPassword } = user.toObject() // Use toObject() instead of _doc
			res.json(userWithoutPassword) // Respond with user data without the password
		} catch (error) {
			return res.status(403).json({
				message: 'Not access',
			})
		}
	}
)

app.listen(3200, (err?: Error) => {
	if (err) return console.error(err)
	console.log('Server is listening on port 3200')
})
