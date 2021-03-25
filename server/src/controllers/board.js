const Board = require('../models/board')

const exportResult = {

  // Create Board
  async create(req, res, next) {
    try {
      const data = req.body
      const result = await Board.add(data)
      res.result = result
      next(res)
    } catch (err) { next(err) }
  },

  // List all Board
  async list(req, res, next) {
    try {
      const query = req.query
      const result = await Board.list(query)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Show Board Details
  async details(req, res, next) {
    try {
      const boardId = req.params.boardId
      const result = await Board.details(boardId)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Update Board
  async update(req, res, next) {
    try {
      const boardId = req.params.boardId
      const result = await Board.updateById(boardId, req.body)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Archive Board (Soft Delete)
  async delete(req, res, next) {
    try {
      const boardId = req.params.boardId, type = req.query.type
      let result
      if(type === 'soft') result = await Board.softDelete(boardId)
      else result = await Board.remove(boardId)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

}

module.exports = exportResult