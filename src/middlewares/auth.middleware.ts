import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

// Interface to extend the request object with userId
interface CustomRequest extends Request {
	userId?: string // Make it optional to avoid TS errors before middleware adds userId
}

interface DecodedToken extends JwtPayload {
	_id: string
}

export const authMiddleware = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret') as DecodedToken
			req.userId = decoded._id
			next()
		} catch (error) {
			return res.status(403).json({
				message: 'Not access',
			})
		}
	} else {
		return res.status(403).json({
			message: 'Not access',
		})
	}
}
