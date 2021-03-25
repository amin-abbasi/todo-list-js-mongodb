const { errors } = require('celebrate')
const { Router } = require('express')

const router = Router()

// Board APIs
const boardRouter = require('./board')
router.use('/v1/boards', boardRouter)

// API Documentation Swagger
const swaggerUi = require('swagger-ui-express')
const specs = require('../services/swagger')
router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(specs, { explorer: true }))

// Health-check Endpoint
router.get('/health', (_req, res) => { res.send('200') })

router.use(errors())

module.exports = router