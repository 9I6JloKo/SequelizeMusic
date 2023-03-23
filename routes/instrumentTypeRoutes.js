const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const instrumentTypes = require("../controllers/instrumentTypeController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], instrumentTypes.create)
    router.get("/", instrumentTypes.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], instrumentTypes.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], instrumentTypes.delete)
    app.use('/api/instrumentTypes', router)
}


/**
* @swagger
* components:
*  schemas:
*      InstrumentType:
*          type: object
*          required:
*              - typeName
*          properties:
*              typeName:
*                  type: string
*                  description: typeName of instrument
*          example:
*              typeName: CupperBlow
*/

/**
* @swagger
* components:
*  schemas:
*      InstrumentTypePut:
*          type: object
*          required:
*              - id
*              - typeName
*          properties:
*              id:
*                  type: integer
*                  description: id of instrument
*              typeName:
*                  type: string
*                  description: typeName of instrument
*          example:
*              id: 1
*              typeName: CupperBlow
*/

/**
 * 
 * @swagger
 * tags:
 *   name: instrumentTypes
 *   description: The instrumentTypes managing API
 * /api/instrumentTypes:
 *  get:
 *      summary: Retrieve a list of InstrumentType.
 *      description: Retrieve a list of InstrumentType.
 *      tags: [instrumentTypes]
 *      responses:
 *          200:
 *              description: A list of InstrumentType.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/InstrumentType'
 *                                  
 */

/**
 * @swagger
 * /api/instrumentTypes:
 *   post:
 *     summary: Create a new InstrumentType
 *     description: Retrieve a list of InstrumentType.
 *     tags: [instrumentTypes]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstrumentType'
 *     responses:
 *       200:
 *         description: The created InstrumentType.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstrumentType'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/instrumentTypes:
 *   put:
 *     summary: change an InstrumentType
 *     description: change an InstrumentType
 *     tags: [instrumentTypes]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstrumentTypePut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstrumentTypePut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/instrumentTypes/{instrumentTypeId}:
 *  delete:
 *      summary: delete an InstrumentType
 *      description: delete an InstrumentType
 *      tags: [instrumentTypes]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: instrumentTypeId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of instrumentType to delete
 *      responses:
 *          200:
 *              description: instrumentType that was deleted
 *          400:
 *              description: Some server error
*/