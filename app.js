let classicMusic = require('./dbModels/classicMusic')
let compositor = require('./dbModels/compositor')
let instrument = require('./dbModels/instrument')
let instrumentType = require('./dbModels/instrumentType')
let db = require('./dbCreate/databaseCreate')


classicMusic.belongsToMany(compositor, {through: 'musicToCompositor'})
compositor.belongsToMany(classicMusic, {through: 'musicToCompositor'})
instrument.belongsToMany(classicMusic, {through: 'musicToInstrument'})
classicMusic.belongsToMany(instrument, {through: 'musicToInstrument'})

instrumentType.hasMany(instrument, {
    foreignKey: 'typeOfInstrument'
});


async function dataCreate(){
    await db.sync({force:true}); // force - создать или перезаписать базу с нуля
    // await dbAdd(data);

    const express = require("express")
    const cors = require("cors")
    const app = express()

    // app.use(cors())

    // app.use(express.json())

    // app.use(express.urlencoded({ extended: true}))

    // app.get("/", (req,res) => {
    //     res.json({ message: "Welcome to library Restful API"})
    // })

    // require("./routes/categoryRoutes")(app)
    // require("./routes/authorRoutes")(app)
    // require("./routes/bookRoutes")(app)
    // require("./routes/authorBookRoutes")(app)
    // require("./routes/bookCategoryRoutes")(app)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
    })

}
dataCreate()