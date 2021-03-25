const express = require('express')
const router = express.Router()

// Add Controllers & Validators
const Controller = require('../controllers/board')
const Validator  = require('../validators/board')

// (action)             (verb)    (URI)
// create:              POST      - /boards
// list:                GET       - /boards
// details:             GET       - /boards/:boardId
// update:              PUT       - /boards/:boardId
// delete:              DELETE    - /boards/:boardId

// ---------------------------------- Define All Board Routes Here ----------------------------------

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Board management
 */

/**
 * @swagger
 * path:
 *  /boards/:
 *    post:
 *      summary: Create a new board
 *      tags: [Boards]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Board'
 *      responses:
 *        "200":
 *          description: A board schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Board'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('').post(Validator.create, Controller.create)

/**
 * @swagger
 * path:
 *  /boards/:
 *    get:
 *      summary: Get list of all Boards
 *      tags: [Boards]
 *      responses:
 *        "200":
 *          description: Gets a list of boards as an array of objects
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        total:
 *                          type: integer
 *                        list:
 *                          $ref: '#/components/schemas/Board'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('').get(Validator.list, Controller.list)

/**
 * @swagger
 * path:
 *  /boards/{boardId}:
 *    get:
 *      summary: Board Details
 *      tags: [Boards]
 *      parameters:
 *        - name: boardId
 *          in: path
 *          description: Board ID
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Gets a board's details
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Board'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('/:boardId').get(Validator.details, Controller.details)

/**
 * @swagger
 * path:
 *  /boards/{boardId}:
 *    put:
 *      summary: Board Update
 *      tags: [Boards]
 *      parameters:
 *        - name: boardId
 *          in: path
 *          description: Board ID
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Admin can update a board
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Board'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('/:boardId').put(Validator.update, Controller.update)

/**
 * @swagger
 * path:
 *  /boards/{boardId}:
 *    delete:
 *      summary: Delete Board
 *      tags: [Boards]
 *      parameters:
 *        - name: boardId
 *          in: path
 *          description: Board ID
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Admin can delete a board [soft delete]
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Response Status
 *                  result:
 *                    $ref: '#/components/schemas/Board'
 *        "400":
 *          description: Bad request schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                  message:
 *                    type: string
 *                  body:
 *                    type: object
 */
router.route('/:boardId').delete(Validator.delete, Controller.delete)

module.exports = router
