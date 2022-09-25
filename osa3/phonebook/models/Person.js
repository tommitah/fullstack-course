const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to database...`)
mongoose.connect(url)
	.then(result => console.log('connected to MongoDB'))
	.catch(error => console.error(`error connecting to MongoDB: ${error.message}`))

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		minlength: 8,
		validate: {
			validator: (v) => {
				return /\d{2}-\d{6}/.test(v) || /\d{3}-\d{5}/.test(v)
			},
			message: props => `${props.value} is not a valid phone number!`,
		},
		required: true,
	},
	id: Number
})

personSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj._v
	}
})

module.exports = mongoose.model('Person', personSchema)
