// const app = require('./app')
const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// Creates the server from the express module
const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
