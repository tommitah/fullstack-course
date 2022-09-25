const mongoose = require('mongoose')
const Person = require('./models/Person')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

// this checks CLI parameter when running 'node mongo.js {password}'
const password = process.argv[2] || false
const name = process.argv[3] || false
const number = process.argv[4] || false

const url = `mongodb+srv://tommitahDb:${password}@cluster0.hc39qwg.mongodb.net/yellow-pages?retryWrites=true&w=majority`
///////// DB fetching
// So how this works is that it DOES query the db correctly, the issue is that outside its scope it is undefined??
// solved by doing this inline in the function where we need the the collection. So no 'global' (file scope) 
// persons list should be used I guess.
// const getPersons = async () => persons = await Person.find({})
//////// /DB fetching

const generateId = persons => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(p => p.id))
		: 0
	return maxId + 1
}

const addPerson = async () => {
	//Person.create is the same as doing new Person() and then .save()
	const persons = await Person.find({})
	const id = generateId(persons)
	await Person.create({
		name: name,
		number: number,
		id: id
	})
	console.log(`added ${name} number ${number} to yellow-pages`)
	mongoose.connection.close()
}

mongoose.connect(url)

if (password && (!name || !number)) {
	Person
		.find({})
		.then(persons => {
			console.log('Yellow pages:')
			persons.map(person => console.log(`${person.name} ${person.number}`))
			mongoose.connection.close()
		})
}
else addPerson()


