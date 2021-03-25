const { celebrate, Joi } = require('celebrate')
const config = require('../configs')

const objectId = Joi.string().regex(config.regex.objectId)

const exportResult = {

  // Create new Board
  create: celebrate({
    body: {
      title: Joi.string().required().description('Board Title'),
      privacy: Joi.string()
        .valid(...Object.keys(config.privacyTypes))
        .default(config.privacyTypes.public)
        .description('Board Privacy'),
      // userId: objectId.required().description('User ID')
    },
    query: {}
  }),

  // List All Boards
  list: celebrate({
    query: {
      size: Joi.number().default(10).description('Board Pagination Size'),
      page: Joi.number().default(1).description('Board Pagination Page'),
      // name: Joi.string().max(50).description('Board Name'),
      // userId: Joi.string().max(50).description('User ID'),
      // dateRange: Joi.object({
      //   from: Joi.date().description('Date Range From'),
      //   to:   Joi.date().description('Date Range To'),
      // }).or('from', 'to').description('Date Range'),
    }
  }),

  // Show Board Details
  details: celebrate({
    params: {
      boardId: objectId.required().description('Board ID')
    },
    query: {}
  }),

  // Update Board
  update: celebrate({
    body: {
      title: Joi.string().required().description('Board Title'),
      privacy: Joi.string().valid(...Object.keys(config.privacyTypes)).description('Board Privacy'),
      // userId: objectId.required().description('User ID')
    },
    params: {
      boardId: objectId.required().description('Board ID')
    },
    query: {}
  }),

  // Delete Board (Soft Delete)
  delete: celebrate({
    params: {
      boardId: objectId.required().description('Board ID')
    },
    query: {
      type: Joi.string().valid('soft', 'hard').description('Delete model type [soft / hard]')
    }
  }),

}

module.exports = exportResult
