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
    router.get("/", users.findAll)
    // post нету по причине существования @signup@
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], users.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete)
    app.use('/api/users', router)
};
