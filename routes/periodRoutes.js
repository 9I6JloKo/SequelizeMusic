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
    const periods = require("../controllers/periodController");
    const router = require("express").Router();
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], periods.create)
    router.get("/", [authJwt.verifyToken], periods.findAll)
    router.put("/", [authJwt.verifyToken, authJwt.isModerator], periods.change)
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], periods.delete)
    app.use('/api/periods', router)
}