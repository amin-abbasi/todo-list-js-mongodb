require('dotenv').config()

const env = JSON.parse(JSON.stringify(process.env))

// All Configs that needed to be centralized
const config = {

  // dotenv App Environment Variables
  env: env,

  // Base URL
  baseURL: `${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}`,

  // Regex
  regex: {
    objectId: /^[0-9a-fA-F]{24}$/
  },

  // privacyTypes
  privacyTypes: {
    public  : 'public',
    private : 'private'
  }

}

module.exports = config