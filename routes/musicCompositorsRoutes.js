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
    const compositorMusic = require("../controllers/musicCompositorController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], compositorMusic.create)
    router.get("/", [authJwt.verifyToken], compositorMusic.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], compositorMusic.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], compositorMusic.delete)
    app.use('/api/compositorMusics', router)
}