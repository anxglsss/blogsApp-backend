import express from 'express'
import * as authController from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { loginValidator, registerValidator } from '../validators/auth-validator'

export const authRouter = express.Router()

authRouter.post('/login', loginValidator, authController.login)
authRouter.post('/register', registerValidator, authController.register)
authRouter.get('/me', authMiddleware, authController.getMe)
