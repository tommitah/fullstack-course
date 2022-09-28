const { info, error } = require('./logger')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
	info(`Method: ${req.method}`)
	info(`Path: ${req.path}`)
	info(`Body: ${JSON.stringify(req.body)}`)
	info('---')
	next()
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
	error(err.message)

	if (err.name === 'CastError') {
		return res.status(404).send({ error: 'malformatted id' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' })
	} else if (err.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' })
	}
	next(err)
}

const tokenExtractor = (req, res, next) => {
	const auth = req.get('authorization')
	if (auth && auth.toLowerCase().startsWith('bearer '))
		req.token = auth.substring(7)
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
}
