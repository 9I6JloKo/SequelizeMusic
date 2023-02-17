module.exports = app => {
    const instrumentMusic = require("../controllers/musicInstrumentController");
    const router = require("express").Router();
    router.post("/", instrumentMusic.create)
    router.get("/", instrumentMusic.findAll)
    router.put("/", instrumentMusic.change)
    router.delete("/:id", instrumentMusic.delete)
    app.use('/api/musicInstruments', router)
}