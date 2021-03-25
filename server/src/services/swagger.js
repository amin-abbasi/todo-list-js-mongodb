// Open http://<app_host>:<app_port>/docs in your browser to view the documentation.
const swagger   = require('swagger-jsdoc')
const config    = require('../configs')
const myPackage = require('../../package.json')

const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = config.env
const url = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api`

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: myPackage.name,
    version: myPackage.version,
    description: myPackage.description,
    license: { name: myPackage.license, url: 'http://aminabbasi.com/licenses' },
    contact: { name: myPackage.author, email: 'info@aminabbasi.com' }
  },
  servers: [ { url: `${url}/v1` } ],
  consumes: ['application/json'],
  produces: ['application/json'],
}

const options = {
  swaggerDefinition: swaggerDefinition,
  // Path files to be processes. for: {openapi: '3.0.0'}
  apis: [
    './dist/routes/*.js',
    './dist/models/*.js',
  ],
}

const specs = swagger(options)
module.exports = specs
