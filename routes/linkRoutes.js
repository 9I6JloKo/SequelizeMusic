const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const links = require("../controllers/linksController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], links.create)
    router.get("/", links.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], links.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], links.delete)
    app.use('/api/links', router)
}


/**
* @swagger
* components:
*  schemas:
*      Link:
*          type: object
*          required:
*              - music_id 
*              - link_string
*          properties:
*              music_id:
*                  type: integer
*                  description: music_id of Link
*              link_string:
*                  type: string
*                  description: link_string of Link
*          example:
*              music_id: 1
*              link_string: "https://bb.com"
*/

/**
* @swagger
* components:
*  schemas:
*      LinkPut:
*          type: object
*          required:
*              - id
*              - music_id
*              - link_string
*          properties:
*              id:
*                  type: integer
*                  description: id of Link
*              music_id:
*                  type: integer
*                  description: music_id of Link
*              link_string:
*                  type: string
*                  description: lastName of Link
*          example:
*              id: 1
*              music_id: 1
*              link_string: "https://bb.com"
*/


/**
 * 
 * @swagger
 * tags:
 *   name: Links
 *   description: The Links managing API
 * /api/links:
 *  get:
 *      summary: Retrieve a list of Link.
 *      description: Retrieve a list of Link.
 *      tags: [Links]
 *      responses:
 *          200:
 *              description: A list of Link.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Link'
 *                                  
 */

/**
 * @swagger
 * /api/links:
 *   post:
 *     summary: Create a new Link
 *     description: Retrieve a list of Link.
 *     tags: [Links]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Link'
 *     responses:
 *       200:
 *         description: The created Link.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/links:
 *   put:
 *     summary: change an Link
 *     description: change an Link
 *     tags: [Links]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LinkPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LinkPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/links/{LinkId}:
 *  delete:
 *      summary: delete an Link
 *      description: delete an Link
 *      tags: [Links]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: LinkId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of Link to delete
 *      responses:
 *          200:
 *              description: Link that was deleted
 *          400:
 *              description: Some server error
*/