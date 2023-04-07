const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const genreMusic = require("../controllers/musicGenreController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], genreMusic.create)
    router.get("/", genreMusic.findAllMusicAndGenre)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], genreMusic.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], genreMusic.delete)
    app.use('/api/genreMusics', router)
}


/**
* @swagger
* components:
*  schemas:
*      MusicGenre:
*          type: object
*          required:
*              - genreId 
*              - musicId  
*          properties:
*              genreId:
*                  type: integer
*                  description: genreId of MusicGenre
*              musicId :
*                  type: integer
*                  description: musicId of MusicGenre
*          example:
*              genreId: 1
*              musicId: 1
*/

/**
* @swagger
* components:
*  schemas:
*      MusicGenrePut:
*          type: object
*          required:
*              - id 
*              - genreId 
*              - musicId  
*          properties:
*              id:
*                  type: integer
*                  description: id of MusicGenre
*              genreId:
*                  type: integer
*                  description: genreId of MusicGenre
*              musicId :
*                  type: integer
*                  description: musicId of MusicGenre
*          example:
*              id: 1
*              genreId: 1
*              musicId: 1
*/


/**
 * 
 * @swagger
 * tags:
 *   name: MusicGenres
 *   description: The MusicGenres managing API
 * /api/genreMusics:
 *  get:
 *      summary: Retrieve a list of MusicGenre.
 *      description: Retrieve a list of MusicGenre.
 *      tags: [MusicGenres]
 *      responses:
 *          200:
 *              description: A list of MusicGenre.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MusicGenre'
 *                                  
 */

/**
 * @swagger
 * /api/genreMusics:
 *   post:
 *     summary: Create a new MusicGenre
 *     description: Retrieve a list of MusicGenre.
 *     tags: [MusicGenres]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicGenre'
 *     responses:
 *       200:
 *         description: The created MusicGenre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MusicGenre'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/genreMusics:
 *   put:
 *     summary: change an MusicGenre
 *     description: change an MusicGenre
 *     tags: [MusicGenres]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicGenrePut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MusicGenrePut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/genreMusics/{MusicGenreId}:
 *  delete:
 *      summary: delete an MusicGenre
 *      description: delete an MusicGenre
 *      tags: [MusicGenres]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: MusicGenreId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of MusicGenre to delete
 *      responses:
 *          200:
 *              description: MusicGenre that was deleted
 *          400:
 *              description: Some server error
*/