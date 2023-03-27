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
    const compositors = require("../controllers/compositorController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], compositors.create)
    router.get("/", compositors.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], compositors.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], compositors.delete)
    app.use('/api/compositors', router)
}

/**
* @swagger
* components:
*  schemas:
*      Compositor:
*          type: object
*          required:
*              - firstName
*              - lastName
*              - descCompositor
*          properties:
*              firstName:
*                  type: string
*                  description: Name of Compositor
*              lastName:
*                  type: string
*                  description: lastName of Compositor
*              descCompositor:
*                  type: string
*                  description: descCompositor of Compositor
*              dateOfBirth:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Compositor
*              dateOfDeath:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Compositor
*              countryOfBirth:
*                  type: string
*                  description: lastName of Compositor
*              photoCompositor:
*                  type: string
*                  description: descCompositor of Compositor
*          example:
*              firstName: Alex
*              lastName: Puwkin
*              descCompositor: Important info
*              dateOfBirth: "2019-05-17"
*              dateOfDeath: "2020-05-17"
*              countryOfBirth: Toila
*              photoCompositor: "/src/jpg.jpg"
*/

/**
* @swagger
* components:
*  schemas:
*      CompositorPut:
*          type: object
*          required:
*              - id
*              - firstName
*              - lastName
*              - descCompositor
*          properties:
*              id:
*                  type: integer
*                  description: id of Compositor
*              firstName:
*                  type: string
*                  description: Name of Compositor
*              lastName:
*                  type: string
*                  description: lastName of Compositor
*              descCompositor:
*                  type: string
*                  description: descCompositor of Compositor
*              dateOfBirth:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Compositor
*              dateOfDeath:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: publishedAt of Compositor
*              countryOfBirth:
*                  type: string
*                  description: lastName of Compositor
*              photoCompositor:
*                  type: string
*                  description: descCompositor of Compositor
*          example:
*              id: 1
*              firstName: Alex
*              lastName: Puwkin
*              descCompositor: Important info
*              dateOfBirth: "2019-05-17"
*              dateOfDeath: "2020-05-17"
*              countryOfBirth: Toila
*              photoCompositor: "/src/jpg.jpg"
*/

/**
 * 
 * @swagger
 * tags:
 *   name: Compositors
 *   description: The Compositors managing API
 * /api/compositors:
 *  get:
 *      summary: Retrieve a list of Compositor.
 *      description: Retrieve a list of Compositor.
 *      tags: [Compositors]
 *      responses:
 *          200:
 *              description: A list of Compositor.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Compositor'
 *                                  
 */

/**
 * @swagger
 * /api/compositors:
 *   post:
 *     summary: Create a new Compositor
 *     description: Retrieve a list of Compositor.
 *     tags: [Compositors]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compositor'
 *     responses:
 *       200:
 *         description: The created Compositor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compositor'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/compositors:
 *   put:
 *     summary: change an Compositor
 *     description: change an Compositor
 *     tags: [Compositors]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompositorPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompositorPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/compositors/{CompositorId}:
 *  delete:
 *      summary: delete an Compositor
 *      description: delete an Compositor
 *      tags: [Compositors]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: CompositorId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of Compositor to delete
 *      responses:
 *          200:
 *              description: Compositor that was deleted
 *          400:
 *              description: Some server error
*/