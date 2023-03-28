const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const instruments = require("../controllers/instrumentController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], instruments.create)
    router.get("/", instruments.findAllWithType)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], instruments.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], instruments.delete)
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
*              - pictureInstrument
*              - typeOfInstrument
*              - publishedAt
*          properties:
*              instrumentName:
*                  type: string
*                  description: Name of instrument
*              pictureInstrument:
*                  type: string
*                  description: pictureInstrument of instrument
*              typeOfInstrument:
*                  type: integer
*                  description: typeOfInstrument of instrument
*              publishedAt:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of instrument
*          example:
*              instrumentName: Piano
*              pictureInstrument: Piano
*              typeOfInstrument: 1
*              publishedAt: "2019-05-17"
*/


/**
* @swagger
* components:
*  schemas:
*      InstrumentPut:
*          type: object
*          required:
*              - id
*              - instrumentName
*              - pictureInstrument
*              - typeOfInstrument
*              - publishedAt
*          properties:
*              id:
*                  type: integer
*                  description: id of instrument
*              instrumentName:
*                  type: string
*                  description: Name of instrument
*              pictureInstrument:
*                  type: string
*                  description: pictureInstrument of instrument
*              typeOfInstrument:
*                  type: integer
*                  description: typeOfInstrument of instrument
*              publishedAt:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of instrument
*          example:
*              id: 1
*              instrumentName: Piano
*              pictureInstrument: Piano
*              typeOfInstrument: 1
*              publishedAt: "2019-05-17"
*/

/**
 * 
 * @swagger
 * tags:
 *   name: Instruments
 *   description: The Instruments managing API
 * /api/instruments:
 *  get:
 *      summary: Retrieve a list of instrument.
 *      description: Retrieve a list of instrument.
 *      tags: [Instruments]
 *      responses:
 *          200:
 *              description: A list of instrument.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Instrument'
 *                                  
 */

/**
 * @swagger
 * /api/instruments:
 *   post:
 *     summary: Create a new Instrument
 *     description: Retrieve a list of Instrument.
 *     tags: [Instruments]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
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

/**
 * @swagger
 * /api/instruments:
 *   put:
 *     summary: change an instrument
 *     description: change an instrument
 *     tags: [Instruments]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstrumentPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstrumentPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/instruments/{instrumentId}:
 *  delete:
 *      summary: delete an Instrument
 *      description: delete an Instrument
 *      tags: [Instruments]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: instrumentId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of instrument to delete
 *      responses:
 *          200:
 *              description: instrument that was deleted
 *          400:
 *              description: Some server error
*/