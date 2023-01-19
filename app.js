let classicMusic = require('./dbModels/classicMusic')
let compositor = require('./dbModels/compositor')
let instrument = require('./dbModels/instrument')
let instrumentType = require('./dbModels/instrumentType')
let ia = require('./dbModels/musicCompositor')
let ibe = require('./dbModels/musicInstrument')
let db = require('./dbCreate/databaseCreate')


// classicMusic.belongsToMany(compositor, {through: 'musicToCompositor'})
// compositor.belongsToMany(classicMusic, {through: 'musicToCompositor'})
// instrument.belongsToMany(classicMusic, {through: 'musicToInstrument'})
// classicMusic.belongsToMany(instrument, {through: 'musicToInstrument'})

// instrumentType.hasMany(instrument, {
//     foreignKey: 'typeOfInstrument'
// });


async function dataCreate(){
    await db.sync({force:true}); // force - создать или перезаписать базу с нуля
    // await dbAdd(data);

    const express = require("express")
    const cors = require("cors")
    const app = express()

    const bodyParser = require("body-parser")
    const swaggerJsdoc = require("swagger-jsdoc")
    const swaggerUi = require("swagger-ui-express")

    require("./routes/instrumentRoutes")(app)

    app.use(cors());
    // app.use(express.urlencoded({ extended: true}))
    // app.use(express.json())
    
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({limit:"4000mb", extended: true, parameterLimit:5000000}))
    app.use(bodyParser.json({limit:"4000mb"}))
    app.use(express.static(__dirname + '/public'))
    const PORT = process.env.PORT || 3000
    // const options = {
    //     definition: {
    //         openapi: "3.0.0",
        //   info: {
        //     title: "LogRocket Express API with Swagger",
        //     version: "0.1.0",
        //     description:
        //       "This is a simple CRUD API application made with Express and documented with Swagger",
        //     license: {
        //       name: "MIT",
        //       url: "https://spdx.org/licenses/MIT.html",
        //     },
        //     contact: {
        //       name: "LogRocket",
        //       url: "https://logrocket.com",
        //       email: "info@email.com",
        //     },
        //   },
        //     servers: [
        //         {
        //         url: "http://localhost:3000",
        //         },
        //     ],
        //     },
        //     apis: ["./routes/*.js"],
        // };
      
        // const specs = swaggerJsdoc(options);
        // app.use(
        //     "/api-docs",
        //     swaggerUi.serve,
        //     swaggerUi.setup(specs, { explorer: true }, )
        // );
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`)
        })
    // http://localhost:3000/api-docs
}
dataCreate()