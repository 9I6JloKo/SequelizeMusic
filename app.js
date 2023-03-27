let compositor = require('./dbModels/compositor')
let instrument = require('./dbModels/instrument')
let period = require('./dbModels/period')
let genre = require('./dbModels/genre')
let classicMusic = require('./dbModels/classicMusic')
let link = require('./dbModels/link')
let instrumentType = require('./dbModels/instrumentType')
let ia = require('./dbModels/musicCompositor')
let ibe = require('./dbModels/musicInstrument')
let ide = require('./dbModels/musicGenre')
// let ru = require('./dbModels/roleUser')
let db = require('./dbCreate/databaseCreate')
const db2 = require("./dbModels");
const Role = db2.role;

// classicMusic.belongsToMany(compositor, {through: 'musicToCompositor'})
// compositor.belongsToMany(classicMusic, {through: 'musicToCompositor'})
// instrument.belongsToMany(classicMusic, {through: 'musicToInstrument'})
// classicMusic.belongsToMany(instrument, {through: 'musicToInstrument'})

// instrumentType.hasMany(instrument, {
//     onDelete: "CASCADE"
// });
// instrument.belongsTo(instrumentType);

async function dataCreate(){
  db2.sequelize.sync();
  await db.sync({alter: true}); // force - создать или перезаписать базу с нуля
  // await dbAdd(data);

  const express = require("express")
  const cors = require("cors")
  const app = express()
  var corsOptions = {
    origin: "http://localhost:8081"
  };
  app.use(cors(corsOptions)); 

  const bodyParser = require("body-parser")
  const swaggerJsdoc = require("swagger-jsdoc")
  const swaggerUi = require("swagger-ui-express")
  // app.use(express.urlencoded({ extended: true}))
  // app.use(express.json())
  
  app.set('view engine', 'ejs')
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({limit:"4000mb", extended: true, parameterLimit:5000000}))
  app.use(bodyParser.json({limit:"4000mb"}))
  require("./routes/instrumentRoutes")(app)
  require("./routes/instrumentTypeRoutes")(app)
  require("./routes/musicInstrumentRoutes")(app)
  require("./routes/musicRoutes")(app)
  require("./routes/genreRoutes")(app)
  require("./routes/musicGenreRoutes")(app)
  require("./routes/compositorRoutes")(app)
  require("./routes/musicCompositorsRoutes")(app)
  require("./routes/linkRoutes")(app)
  require("./routes/periodRoutes")(app)
  require('./routes/auth.routes')(app);
  require('./routes/role.routes')(app);
  require('./routes/user.routes')(app);
  app.use(express.static(__dirname + '/public'))
  const options = {
      definition: {
          openapi: "3.0.0",
        info: {
          title: "LogRocket Express API with Swagger",
          version: "1.5670.345.0.0",
          description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
          license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
          },
          contact: {
            name: "LogRocket",
            url: "https://logrocket.com",
            email: "info@email.com",
          },
        },
          servers: [
              {
              url: "http://localhost:3000",
              },
          ],
          },
          apis: ["./routes/*.js"],
      };
    
      const specs = swaggerJsdoc(options);
      app.use(
          "/api-docs",
          swaggerUi.serve,
          swaggerUi.setup(specs, { explorer: true }, )
      );
      const PORT = process.env.PORT || 3000
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}.`)
      })
  // http://localhost:3000/api-docs
}
dataCreate()
// для начального запуска проекта (невозможно выполнить методы без jwt из-за проверки. А для этого нужны роли для создания юзера)
// сначала запустить код без cоздания ролей, затем вместе с методом создания ролей, затем вновь отключить метод. Снизу запуск
function initial() {
  Role.create({
    name: "user"
  });
 
  Role.create({
    name: "moderator"
  });
 
  Role.create({
    name: "admin"
  });
}
// запуск ----
// initial()