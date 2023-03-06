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
  const roles = require("../controllers/role.controller");
    const router = require("express").Router();
    router.get("/", roles.findAll);
    // post нету по причине существования @signup@
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], roles.change)
    router.post("/", [authJwt.verifyToken, authJwt.isModerator], roles.create)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], roles.delete)
    app.use('/api/roles', router)
};
