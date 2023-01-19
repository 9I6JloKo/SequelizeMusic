module.exports = app => {
    const instruments = require("../controllers/instrumentController");
    const router = require("express").Router();
    router.post("/", instruments.create)
    router.get("/", instruments.findAll)
    app.use('/api/instruments', router)
}

/**
* @swagger
* components:
*  schemas:
*      Instrument:
*          type: object
*          required:
*              - instrumentName
*          properties:
*              instrumentName:
*                  type: string
*                  description: Name of instrument
*          example:
*              instrumentName: Piano
*/

/**
* @swagger
* /api/instruments:
*  get:
*      summary: INSTRUMENTS.
*      tags: [Instruments]
*      responses:
*          200:
*              description: List of instruments.
*              content:
*                  application/json:
*                  schema:
*                      type: object
*                      properties:
*                          data:
*                              type: array
*                              items:
*                                  type: object
*                                  properties:
*                                      id:
*                                          type: integer
*                                          description: instrument ID
*                                          example: 1
*                                      title:
*                                          type: string
*                                          description: instrument title
*                                          example: струнно щипковый
*/
/**
 * @swagger
 * tags:
 *   name: Instruments
 *   description: The Instruments managing API
 * /api/instruments/:
 *   post:
 *     summary: Create a new Instrument
 *     tags: [Instruments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instrument'
 *     responses:
 *       200:
 *         description: The created Instrument.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrument'
 *       500:
 *         description: Some server error
 *
 */
