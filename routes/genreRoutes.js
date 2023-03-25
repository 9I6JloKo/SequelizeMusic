const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const genres = require("../controllers/genreController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], genres.create)
    router.get("/", genres.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], genres.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], genres.delete)
    app.use('/api/genres', router)
}

/**
* @swagger
* components:
*  schemas:
*      Genre:
*          type: object
*          required:
*              - genre_name
*              - descGenre
*          properties:
*              genre_name:
*                  type: string
*                  description: Name of Genre
*              descGenre:
*                  type: string
*                  description: lastName of Genre
*              publishedAt:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Genre
*          example:
*              genre_name: Alex
*              descGenre: Puwkin
*              publishedAt: "2019-05-17"
*/

/**
* @swagger
* components:
*  schemas:
*      GenrePut:
*          type: object
*          required:
*              - id
*              - genre_name
*              - descGenre
*          properties:
*              id:
*                  type: integer
*                  description: id of Genre
*              genre_name:
*                  type: string
*                  description: Name of Genre
*              descGenre:
*                  type: string
*                  description: lastName of Genre
*              publishedAt:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Genre
*          example:
*              id: 1
*              genre_name: Alex
*              descGenre: Puwkin
*              publishedAt: "2019-05-17"
*/

/**
 * 
 * @swagger
 * tags:
 *   name: Genres
 *   description: The Genres managing API
 * /api/genres:
 *  get:
 *      summary: Retrieve a list of Genre.
 *      description: Retrieve a list of Genre.
 *      tags: [Genres]
 *      responses:
 *          200:
 *              description: A list of Genre.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Genre'
 *                                  
 */

/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Create a new Genre
 *     description: Retrieve a list of Genre.
 *     tags: [Genres]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: The created Genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/genres:
 *   put:
 *     summary: change an Genre
 *     description: change an Genre
 *     tags: [Genres]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenrePut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenrePut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/genres/{GenreId}:
 *  delete:
 *      summary: delete an Genre
 *      description: delete an Genre
 *      tags: [Genres]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: GenreId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of Genre to delete
 *      responses:
 *          200:
 *              description: Genre that was deleted
 *          400:
 *              description: Some server error
*/