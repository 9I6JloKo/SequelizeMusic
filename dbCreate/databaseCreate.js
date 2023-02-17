const sequelize = require('sequelize');
let mysql = require("mysql2");
let connection2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
}).query("CREATE DATABASE IF NOT EXISTS sequelizedb",
    function(err, results) {
    if(err) console.log(err);
    else console.log("База данных создана");
})

connection = new sequelize.Sequelize('sequelizedb','root','',{
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = connection;