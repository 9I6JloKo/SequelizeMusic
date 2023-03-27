const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const musics = require("../controllers/musicController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], musics.create)
    router.get("/", musics.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], musics.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], musics.delete)
    app.use('/api/musics', router)

    router.get("/findByGenre/:genrename", musics.findByGenre)
    app.use('/api/musics/findByGenre', router)
}


/**
* @swagger
* components:
*  schemas:
*      Music:
*          type: object
*          required:
*              - title
*          properties:
*              title:
*                  type: string
*                  description: title of Music
*              period_id :
*                  type: ['null', integer]
*                  description: period_id of Music
*              publishedAt:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Music
*          example:
*              title: "Mozart song"
*              period_id: null
*              publishedAt: "2019-05-17"
*/

/**
* @swagger
* components:
*  schemas:
*      MusicPut:
*          type: object
*          required:
*              - id
*              - title
*          properties:
*              id:
*                  type: integer
*                  description: id of Music
*              title:
*                  type: string
*                  description: title of Music
*              period_id :
*                  type: integer
*                  description: period_id of Music
*              publishedAt:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Music
*          example:
*              id: 1
*              title: "Mozart song"
*              period_id: 1
*              publishedAt: "2019-05-17"
*/


/**
 * @swagger
 * /api/musics/findByGenre/{genreName}:
 *  get:
 *      summary: get a Music by genre
 *      description: get a Music
 *      tags: [Musics]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: genreName
 *          schema:
 *              type: string
 *              example: 'null'
 *          description: genreName of Music to get
 *          required: true
 *      responses:
 *          200:
 *              description: A list of Music.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Music'
 *          400:
 *              description: Some server error
*/

/**
 * 
 * @swagger
 * tags:
 *   name: Musics
 *   description: The Musics managing API
 * /api/musics:
 *  get:
 *      summary: Retrieve a list of Music.
 *      description: Retrieve a list of Music.
 *      tags: [Musics]
 *      responses:
 *          200:
 *              description: A list of Music.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Music'
 *                                  
 */

/**
 * @swagger
 * /api/musics:
 *   post:
 *     summary: Create a new Music
 *     description: Retrieve a list of Music.
 *     tags: [Musics]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Music'
 *     responses:
 *       200:
 *         description: The created Music.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Music'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/musics:
 *   put:
 *     summary: change an Music
 *     description: change an Music
 *     tags: [Musics]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MusicPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/musics/{MusicId}:
 *  delete:
 *      summary: delete an Music
 *      description: delete an Music
 *      tags: [Musics]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: MusicId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of Music to delete
 *      responses:
 *          200:
 *              description: Music that was deleted
 *          400:
 *              description: Some server error
*/