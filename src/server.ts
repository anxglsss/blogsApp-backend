import express from 'express'
import mongoose from 'mongoose'
import { authRouter } from './routes/auth.routes'
import { postRouter } from './routes/post.routes'

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

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

app.listen(3200, (err?: Error) => {
	if (err) return console.error(err)
	console.log('Server is listening on port 3200')
})
