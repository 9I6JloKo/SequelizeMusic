const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const instrumentMusic = require("../controllers/musicInstrumentController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], instrumentMusic.create)
    router.get("/", instrumentMusic.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], instrumentMusic.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], instrumentMusic.delete)
    app.use('/api/musicInstruments', router)
}


/**
* @swagger
* components:
*  schemas:
*      MusicInstrument:
*          type: object
*          required:
*              - instrumentId 
*              - musicId  
*          properties:
*              instrumentId:
*                  type: integer
*                  description: instrumentId of MusicInstrument
*              musicId :
*                  type: integer
*                  description: musicId of MusicInstrument
*          example:
*              instrumentId: 1
*              musicId: 1
*/

/**
* @swagger
* components:
*  schemas:
*      MusicInstrumentPut:
*          type: object
*          required:
*              - id 
*              - instrumentId 
*              - musicId  
*          properties:
*              id:
*                  type: integer
*                  description: id of MusicInstrument
*              instrumentId:
*                  type: integer
*                  description: instrumentId of MusicInstrument
*              musicId :
*                  type: integer
*                  description: musicId of MusicInstrument
*          example:
*              id: 1
*              instrumentId: 1
*              musicId: 1
*/


/**
 * 
 * @swagger
 * tags:
 *   name: MusicInstruments
 *   description: The MusicInstruments managing API
 * /api/musicInstruments:
 *  get:
 *      summary: Retrieve a list of MusicInstrument.
 *      description: Retrieve a list of MusicInstrument.
 *      tags: [MusicInstruments]
 *      responses:
 *          200:
 *              description: A list of MusicInstrument.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MusicInstrument'
 *                                  
 */

/**
 * @swagger
 * /api/musicInstruments:
 *   post:
 *     summary: Create a new MusicInstrument
 *     description: Retrieve a list of MusicInstrument.
 *     tags: [MusicInstruments]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicInstrument'
 *     responses:
 *       200:
 *         description: The created MusicInstrument.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MusicInstrument'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/musicInstruments:
 *   put:
 *     summary: change an MusicInstrument
 *     description: change an MusicInstrument
 *     tags: [MusicInstruments]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicInstrumentPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MusicInstrumentPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/musicInstruments/{MusicInstrumentId}:
 *  delete:
 *      summary: delete an MusicInstrument
 *      description: delete an MusicInstrument
 *      tags: [MusicInstruments]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: MusicInstrumentId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of MusicInstrument to delete
 *      responses:
 *          200:
 *              description: MusicInstrument that was deleted
 *          400:
 *              description: Some server error
*/