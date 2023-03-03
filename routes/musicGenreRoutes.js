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
    const genreMusic = require("../controllers/musicGenreController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], genreMusic.create)
    router.get("/", [authJwt.verifyToken], genreMusic.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], genreMusic.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], genreMusic.delete)
    app.use('/api/genreMusics', router)
}