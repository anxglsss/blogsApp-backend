import { compare } from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'
import UserModel from '../models/user.model'
import { UserDTO } from '../types/user.dto'
passport.use(
	new Strategy({ usernameField: 'email' }, async (email, password, done) => {
		console.log('Local strategy invoked')
		try {
			const user = await UserModel.findOne({ email })
			if (!user) {
				console.log('User not found')
				return done(null, false, { message: 'User not found' })
			}

			const isValidPassword = await compare(password, user.passwordHash)
			if (!isValidPassword) {
				console.log('Invalid password')
				return done(null, false, { message: 'Invalid password' })
			}

			const userDto = new UserDTO(user.email, user.fullName, user.avatarUrl)
			return done(null, userDto)
		} catch (error) {
			console.error('Error during authentication:', error)
			return done(error)
		}
	})
)

passport.serializeUser((user: any, done) => {
	done(null, user._id)
})
passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await UserModel.findById(id)
		done(null, user)
	} catch (error) {
		done(error)
	}
})
