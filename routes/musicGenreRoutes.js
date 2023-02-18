module.exports = app => {
    const genreMusic = require("../controllers/musicGenreController");
    const router = require("express").Router();
    router.post("/", genreMusic.create)
    router.get("/", genreMusic.findAll)
    router.put("/", genreMusic.change)
    router.delete("/:id", genreMusic.delete)
    app.use('/api/genreMusics', router)
}