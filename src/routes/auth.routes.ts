import express from 'express'
import { login } from '../controllers/login.controller'
import { logout } from '../controllers/logout.controller'
import { register } from '../controllers/register.controller'
import { registerValidator } from '../validators/auth-validator'

export const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/register', registerValidator, register)
authRouter.post('/logout', logout)
