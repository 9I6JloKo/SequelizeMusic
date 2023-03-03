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
    const instrumentTypes = require("../controllers/instrumentTypeController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], instrumentTypes.create)
    router.get("/", [authJwt.verifyToken], instrumentTypes.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], instrumentTypes.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], instrumentTypes.delete)
    app.use('/api/instrumentTypes', router)
}