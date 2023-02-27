module.exports = app => {
    const periods = require("../controllers/periodController");
    const router = require("express").Router();
    router.post("/", periods.create)
    router.get("/", periods.findAll)
    router.put("/", periods.change)
    router.delete("/:id", periods.delete)
    app.use('/api/periods', router)
}