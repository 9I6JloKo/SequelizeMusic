const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  const users = require("../controllers/auth.controller");
    const router = require("express").Router();
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], users.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete)
    app.use('/api/users', router)
};


/**
* @swagger
* components:
*  schemas:
*      User:
*          type: object
*          required:
*              - username
*              - email
*              - password
*          properties:
*              roles:
*                  type: array
*                  items:
*                      type: string
*                      description: The instrument's name.
*                      example: "admin"
*              username:
*                  type: string
*                  description: username of User
*              email:
*                  type: string
*                  description: user email
*              password:
*                  type: string
*                  description: password user
*          example:
*              username: Piano
*              email: Piano@mail.ru
*              password: Piano123
*              roles: ["admin"]
*/

/**
* @swagger
* components:
*   parameters:
*     AccessToken:
*       name: "x-access-token"
*       in: header
*       description: Access Token.
*       required: true
*       schema:
*         type: string
*/

/**
* @swagger
* components:
*  schemas:
*      UserCreate:
*          type: object
*          required:
*              - username
*              - password
*          properties:
*              username:
*                  type: string
*                  description: username of User
*              password:
*                  type: string
*                  description: password user
*          example:
*              username: Piano
*              password: Piano123
*/

/**
* @swagger
* components:
*  schemas:
*      UserPut:
*          type: object
*          required:
*              - id
*              - username
*              - password
*          properties:
*              id:
*                  type: integer
*                  description: id of User
*              username:
*                  type: string
*                  description: username of User
*              password:
*                  type: string
*                  description: password user
*          example:
*              id: 1
*              username: Piano
*              password: Piano123
*/

/**
 * 
 * @swagger
 * tags:
 *   name: Users
 *   description: The User managing API
 * /api/users:
 *  get:
 *      summary: Retrieve a list of Users.
 *      description: Retrieve a list of Users.
 *      tags: [Users]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *      responses:
 *          200:
 *              description: A list of Users.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *                                  
*/

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new User
 *     description: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */


/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign as a User
 *     description: Sign as a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: Signed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreate'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: change a User
 *     description: change a User
 *     tags: [Users]
 *     parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPut'
 *     responses:
 *       200:
 *         description: Changed SUCCESSFULLY.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPut'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/users/{userId}:
 *  delete:
 *      summary: delete a User
 *      description: delete a User
 *      tags: [Users]
 *      parameters:
 *        - $ref: '#components/parameters/AccessToken'
 *        - in: path
 *          name: userId
 *          schema:
 *              type: integer
 *          required: true
 *          description: integer id of user to delete
 *      responses:
 *          200:
 *              description: User that was deleted
 *          400:
 *              description: Some server error
*/