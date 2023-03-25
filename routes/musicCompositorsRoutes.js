const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const compositorMusic = require("../controllers/musicCompositorController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], compositorMusic.create)
    router.get("/", compositorMusic.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], compositorMusic.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], compositorMusic.delete)
    app.use('/api/compositorMusics', router)
}


/**
* @swagger
* components:
*  schemas:
*      MusicCompositor:
*          type: object
*          required:
*              - compositorId 
*              - musicId  
*          properties:
*              compositorId:
*                  type: integer
*                  description: compositorId of MusicCompositor
*              musicId :
*                  type: integer
*                  description: musicId of MusicCompositor
*          example:
*              compositorId: 1
*              musicId: 1
*/

/**
* @swagger
* components:
*  schemas:
*      MusicCompositorPut:
*          type: object
*          required:
*              - id 
*              - compositorId 
*              - musicId  
*          properties:
*              id:
*                  type: integer
*                  description: id of MusicCompositor
*              compositorId:
*                  type: integer
*                  description: compositorId of MusicCompositor
*              musicId :
*                  type: integer
*                  description: musicId of MusicCompositor
*          example:
*              id: 1
*              compositorId: 1
*              musicId: 1
*/


/**
 * 
 * @swagger
 * tags:
 *   name: MusicCompositors
 *   description: The MusicCompositors managing API
 * /api/compositorMusics:
 *  get:
 *      summary: Retrieve a list of MusicCompositor.
 *      description: Retrieve a list of MusicCompositor.
 *      tags: [MusicCompositors]
 *      responses:
 *          200:
 *              description: A list of MusicCompositor.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MusicCompositor'
 *                                  
 */

/**
 * @swagger
 * /api/compositorMusics:
 *   post:
 *     summary: Create a new MusicCompositor
 *     description: Retrieve a list of MusicCompositor.
 *     tags: [MusicCompositors]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicCompositor'
 *     responses:
 *       200:
 *         description: The created MusicCompositor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MusicCompositor'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/compositorMusics:
 *   put:
 *     summary: change an MusicCompositor
 *     description: change an MusicCompositor
 *     tags: [MusicCompositors]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicCompositorPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MusicCompositorPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/compositorMusics/{MusicCompositorId}:
 *  delete:
 *      summary: delete an MusicCompositor
 *      description: delete an MusicCompositor
 *      tags: [MusicCompositors]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: MusicCompositorId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of MusicCompositor to delete
 *      responses:
 *          200:
 *              description: MusicCompositor that was deleted
 *          400:
 *              description: Some server error
*/