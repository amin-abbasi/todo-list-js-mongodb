// Your Express Server Configuration Here
require('reflect-metadata')
const fs     = require('fs')
const path   = require('path')
const http   = require('http')
const https  = require('https')
const app    = require('./app')
const config = require('./configs')
const dbConnect = require('./services/db')

const { NODE_ENV, SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = config.env

function setExpressServer(app) {
  let expressServer
  if (SERVER_PROTOCOL === 'http') expressServer = http.createServer(app)
  else {
    const keyPath = path.join(__dirname, '../sslCert/server.key')
    const crtPath = path.join(__dirname, '../sslCert/server.crt')
    const checkPath = fs.existsSync(keyPath) && fs.existsSync(crtPath)
    if (!checkPath) {
      console.error('No SSL Certificate found to run HTTPS Server!!')
      process.exit(1)
    }
    const privateKey = fs.readFileSync(keyPath, 'utf8')
    const certificate = fs.readFileSync(crtPath, 'utf8')
    const credentials = {
      key: privateKey,
      cert: certificate
    }
    expressServer = https.createServer(credentials, app)
  }
  return expressServer
}

// ---------------- Start Server ----------------
const startServer = async (expressServer) => {
  const url = `${SERVER_PROTOCOL || 'http'}://${SERVER_HOST || 'localhost'}:${SERVER_PORT || 4000}`
  const serverMessage = `API is now running on ${url} in ${NODE_ENV || 'development'} mode`
  expressServer.listen(SERVER_PORT, () => { console.info(serverMessage) })
  return serverMessage
}

(async () => {
  try {
    await dbConnect()
    const expressServer = setExpressServer(app)
    await startServer(expressServer)
  } catch (error) {
    throw Error(`>>>>> Server Connection Error: ${error}`)
  }
})()
