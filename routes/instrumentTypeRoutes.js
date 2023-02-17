module.exports = app => {
    const instrumentTypes = require("../controllers/instrumentTypeController");
    const router = require("express").Router();
    router.post("/", instrumentTypes.create)
    router.get("/", instrumentTypes.findAll)
    router.put("/", instrumentTypes.change)
    router.delete("/:id", instrumentTypes.delete)
    app.use('/api/instrumentTypes', router)
}