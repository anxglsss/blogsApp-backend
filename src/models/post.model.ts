import mongoose from 'mongoose'

const PostModel = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		tags: {
			type: Array,
			default: [],
		},
		views: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		imageUrl: String,
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Post', PostModel)
