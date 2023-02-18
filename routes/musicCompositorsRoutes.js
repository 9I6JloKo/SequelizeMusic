module.exports = app => {
    const compositorMusic = require("../controllers/musicCompositorController");
    const router = require("express").Router();
    router.post("/", compositorMusic.create)
    router.get("/", compositorMusic.findAll)
    router.put("/", compositorMusic.change)
    router.delete("/:id", compositorMusic.delete)
    app.use('/api/compositorMusics', router)
}