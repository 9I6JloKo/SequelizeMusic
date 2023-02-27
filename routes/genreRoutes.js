module.exports = app => {
    const genres = require("../controllers/genreController");
    const router = require("express").Router();
    router.post("/", genres.create)
    router.get("/", genres.findAll)
    router.put("/", genres.change)
    router.delete("/:id", genres.delete)
    app.use('/api/genres', router)
}

// /**
// * @swagger
// * components:
// *  schemas:
// *      Instrument:
// *          type: object
// *          required:
// *              - instrumentName
// *          properties:
// *              instrumentName:
// *                  type: string
// *                  description: Name of instrument
// *          example:
// *              instrumentName: Piano
// */

// /**
//  * 
//  * @swagger
//  * tags:
//  *   name: Instruments
//  *   description: The Instruments managing API
//  * /api/instruments:
//  *  get:
//  *      summary: Retrieve a list of instrument.
//  *      description: Retrieve a list of instrument.
//  *      tags: [Instruments]
//  *      responses:
//  *          200:
//  *              description: A list of instrument.
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/Instrument'
//  *                          properties:
//  *                              data:
//  *                                  type: array
//  *                                  items:
//  *                                      type: object
//  *                                      properties:
//  *                                          id:
//  *                                              type: integer
//  *                                              description: The instrument ID.
//  *                                              example: 1
//  *                                          instrumentName:
//  *                                              type: string
//  *                                              description: The instrument's name.
//  *                                              example: RESTful API
//  *                                  
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: Instruments
//  *   description: The Instruments managing API
//  * /api/instruments:
//  *   post:
//  *     summary: Create a new Instrument
//  *     description: Retrieve a list of categories.
//  *     tags: [Instruments]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Instrument'
//  *     responses:
//  *       200:
//  *         description: The created Instrument.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Instrument'
//  *       500:
//  *         description: Some server error
//  *
//  */