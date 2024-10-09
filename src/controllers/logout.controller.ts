import { Request, Response } from 'express'

export const logout = async (req: Request, res: Response) => {
	req.logOut(() => {
		res.json({ message: 'Logout' })
	})
}
