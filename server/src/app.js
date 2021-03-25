// ------ Add npm modules
const express = require('express')
const helmet  = require('helmet')
const cors    = require('cors')
const { urlencoded, json } = require('body-parser')

const app = express()

// ------ Initialize & Use Middle-Wares
app.set('trust proxy', 1)
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(helmet())
app.use(cors())

// ------ Add logger to system
const logger = require('./services/logger')
app.use(logger)

// ------ Require all routes
const router = require('./routes')
app.use('/api', router)

// ------ Add Response Decorator (& error handler) to system
const decorator = require('./services/response_decorator')
app.use(decorator)

module.exports = app
