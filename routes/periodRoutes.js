const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const periods = require("../controllers/periodController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], periods.create)
    router.get("/", periods.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], periods.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], periods.delete)
    app.use('/api/periods', router)
}

/**
* @swagger
* components:
*  schemas:
*      Period:
*          type: object
*          required:
*              - period_name
*              - desc
*          properties:
*              period_name:
*                  type: string
*                  description: Name of Period
*              desc:
*                  type: string
*                  description: lastName of Period
*              startDate:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: startDate of Period
*              endDate:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: endDate of Period
*          example:
*              period_name: Alex
*              desc: Puwkin
*              startDate: "2019-05-17"
*              endDate: "2020-05-17"
*/

/**
* @swagger
* components:
*  schemas:
*      PeriodPut:
*          type: object
*          required:
*              - id
*              - period_name
*              - desc
*          properties:
*              id:
*                  type: integer
*                  description: id of Period
*              period_name:
*                  type: string
*                  description: Name of Period
*              desc:
*                  type: string
*                  description: lastName of Period
*              startDate:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: startDate of Period
*              endDate:
*                  type: date
*                  pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
*                  description: endDate of Period
*          example:
*              id: 1
*              period_name: Alex
*              desc: Puwkin
*              startDate: "2019-05-17"
*              endDate: "2020-05-17"
*/


/**
 * 
 * @swagger
 * tags:
 *   name: Periods
 *   description: The Periods managing API
 * /api/periods:
 *  get:
 *      summary: Retrieve a list of Period.
 *      description: Retrieve a list of Period.
 *      tags: [Periods]
 *      responses:
 *          200:
 *              description: A list of Period.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Period'
 *                                  
 */

/**
 * @swagger
 * /api/periods:
 *   post:
 *     summary: Create a new Period
 *     description: Retrieve a list of Period.
 *     tags: [Periods]
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Period'
 *     responses:
 *       200:
 *         description: The created Period.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Period'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/periods:
 *   put:
 *     summary: change an Period
 *     description: change an Period
 *     tags: [Periods]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeriodPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PeriodPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/periods/{PeriodId}:
 *  delete:
 *      summary: delete an Period
 *      description: delete an Period
 *      tags: [Periods]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: PeriodId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of Period to delete
 *      responses:
 *          200:
 *              description: Period that was deleted
 *          400:
 *              description: Some server error
*/