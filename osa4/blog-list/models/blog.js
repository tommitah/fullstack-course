const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	url: String,
	likes: Number
})

blogSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)
