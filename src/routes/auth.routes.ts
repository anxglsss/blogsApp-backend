import express from 'express'
import { getMe } from '../controllers/get-me.controller'
import { login } from '../controllers/login.controller'
import { register } from '../controllers/register.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { registerValidator } from '../validators/auth-validator'

export const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/register', registerValidator, register)
authRouter.get('/auth/me', authMiddleware, getMe)
