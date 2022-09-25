// import { connect, Schema, model } from 'mongoose'
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

// NOTE: this gets rid of the numerical increment ID and replaces it with the DB _id.
// Might need a refactor somewhere if this is what we're doing
// Or maybe it makes sense to have the numerical id's on the frontend side while the data is not in mongo?
personSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj._v
	}
})

module.exports = mongoose.model('Person', personSchema)
