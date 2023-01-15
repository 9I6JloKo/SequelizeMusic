const sequelize = require('sequelize');
const connection = new sequelize.Sequelize('sequelizedb','root','',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = connection