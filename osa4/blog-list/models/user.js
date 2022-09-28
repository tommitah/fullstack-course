const mongoose = require('mongoose')

// NOTE:
// the blogs ref doesn't affect the database, the db is connection agnostic in this case
// only mongoose(backend) knows about the connection
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	name: {
		type: String,
		default: ''
	},
	passwordHash: {
		type: String,
		required: true
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
})

userSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
		// password hash shouldn't be revealed
		delete obj.passwordHash
	}
})

module.exports = mongoose.model('User', userSchema)
