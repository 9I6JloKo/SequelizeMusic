const { authJwt } = require("../middleware");
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    const instrumentMusic = require("../controllers/musicInstrumentController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], instrumentMusic.create)
    router.get("/", instrumentMusic.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], instrumentMusic.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], instrumentMusic.delete)
    app.use('/api/musicInstruments', router)
}