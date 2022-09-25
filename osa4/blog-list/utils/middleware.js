const { info, error } = require('./logger')

const requestLogger = (req, res, next) => {
	info(`Method: ${req.method}`)
	info(`Path: ${req.path}`)
	info(`Body: ${req.body}`)
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
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	}
	next(err)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}
