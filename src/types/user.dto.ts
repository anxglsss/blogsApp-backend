// user.dto.js
export class UserDTO {
	email: string
	fullName: string
	avatarUrl: string

	constructor(
		email: string,
		fullName: string,
		avatarUrl: string | null | undefined
	) {
		this.email = email
		this.fullName = fullName
		this.avatarUrl = avatarUrl || ''
	}
}
