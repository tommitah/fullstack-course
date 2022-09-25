require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const unknownEndpoint = require('./middleware/unknownEndpoint')
const errorHandler = require('./middleware/errorHandler')

const Person = require('./models/Person')

// middleware
morgan.token('body', req => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
////// TODO:
///// +++ restarting via nodemon still produces and error on 
//// GET :3001/api/persons in the browser(frontend). npm start is fine
// ---> there's still the Uncaught promise error whenever files are saved and nodemon is reloaded
// No idea if this would affect deployment but might be something to look into, looks like it's
// an axios related thing

const generateId = persons => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(p => p.id))
		: 0
	return maxId + 1
}

app.get('/info', (req, res, next) => {
	Person.find({})
		.then(persons => {
			res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p>`)
		})
		.catch(error => {
			console.log(error)
			next(error)
		})
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(error => {
			next(error)
		})
})

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(persons => res.json(persons))
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body
	const persons = Person.find({})
	const id = generateId(persons)

	const person = new Person({
		name: body.name,
		number: body.number,
		id: id
	})

	person.save()
		.then(savedPerson => res.json(savedPerson))
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				person.number = req.body.number
				person.save().then(savedPerson => res.json(savedPerson))
			}
			else res.sendStatus(404) // figure out the correct status code
		})
		.catch(error => {
			next(error)
		})
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id, (error, docs) => {
		// if (error) res.sendStatus(204).json({ error: 'could not find contact' })
		if (error) next(error)
		else res.json(`Deleted: ${docs}`)
	})
})

// TODO: switch all the routes to utilize these (with next())
// error handlers
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
