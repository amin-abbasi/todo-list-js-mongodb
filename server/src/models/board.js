const mongoose = require('mongoose')
const Boom     = require('@hapi/boom')
const uniqueV  = require('mongoose-unique-validator')
const config   = require('../configs')
const { mergeDeep } = require('../services/methods')

const Schema = mongoose.Schema

// Add your own attributes in schema
const schema = new Schema({
  title   : { type: Schema.Types.String, required: true, unique: true },
  privacy : { type: Schema.Types.String, default: config.privacyTypes.public },

  createdAt: { type: Schema.Types.Number },
  updatedAt: { type: Schema.Types.Number },
  deletedAt: { type: Schema.Types.Number, default: 0 },
})

// Apply the Unique Property Validator plugin to schema.
schema.plugin(uniqueV, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.'
})

// Choose your own model name
const Board = mongoose.model('Board', schema)

async function add(data) {
  const boardData = {
    ...data,
    createdAt: new Date().getTime()
  }
  return await Board.create(boardData)
}

async function list(queryData) {
  const { page, size, ...query } = queryData

  // if(query.dateRange) {
  //   query.createdAt = {}
  //   if(query.dateRange.from) query.createdAt['$gte'] = query.dateRange.from
  //   if(query.dateRange.to)   query.createdAt['$lte'] = query.dateRange.to
  //   delete query.dateRange
  // }
  // if(query.name) query.name = { '$regex': query.name, '$options': 'i' }

  const total = await Board.countDocuments(query)
  const result = await Board.find(query).limit(size).skip((page - 1) * size)
  return {
    total: total,
    list: result
  }
}

async function details(boardId) {
  const board = await Board.findById(boardId)
  if(!board || board.deletedAt !== 0) throw Boom.notFound('Board not found.')
  return board
}

async function updateByQuery(query, data) {
  const updatedData = { ...data, updatedAt: new Date().getTime() }
  return await Board.findOneAndUpdate(query, updatedData, { new: true })
}

async function updateById(boardId, data) {
  const board = await details(boardId)
  board.updatedAt = new Date().getTime()
  const updatedBoard = mergeDeep(board, data)
  return await Board.findByIdAndUpdate(boardId, updatedBoard, { new: true })
}

async function softDelete(boardId) {
  const board = await details(boardId)
  return await Board.findByIdAndUpdate(board.id, { deletedAt: new Date().getTime() }, { new: true })
}

async function remove(boardId) {
  const board = await details(boardId)
  return await Board.deleteOne({ _id: board.id })
}

async function restore(boardId) {
  const board = await details(boardId)
  return await Board.findByIdAndUpdate(board.id, { deletedAt: 0 }, { new: true })
}

module.exports = { add, list, details, updateById, updateByQuery, softDelete, remove, restore }

// --------------- Swagger Models Definition ---------------

/**
 * @swagger
 *  components:
 *    schemas:
 *      Board:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *          privacy:
 *            type: string
 *            enum:
 *              - public
 *              - private
 *        example:
 *          title: 'my new board'
 *          privacy: 'public'
 */