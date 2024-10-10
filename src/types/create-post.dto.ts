// user.dto.js
export class CreatePostDTO {
	title: string
	content: string
	tags: string[]
	imageUrl?: string

	constructor(
		title: string,
		content: string,
		tags: string[],
		imageUrl?: string | null | undefined
	) {
		this.title = title
		this.content = content
		this.tags = tags
		this.imageUrl = imageUrl || ''
	}
}
