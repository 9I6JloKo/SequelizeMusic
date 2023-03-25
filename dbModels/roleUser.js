// const {Sequelize,DataTypes,Model} = require('sequelize');
// const db = require('../dbCreate/databaseCreate')
// class roleUser extends Model {}

// roleUser.init(
//     {
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         roleId:{
//             type: DataTypes.INTEGER,
//             allowNull:false,
//             references: {
//                 model: 'roles',
//                 key: 'id'
//             }
//         },
//         userId:{
//             type: DataTypes.INTEGER,
//             allowNull:false,
//             references: {
//                 model: 'users',
//                 key: 'id'
//             }
//         }
//     },
//     {
//         sequelize:db,
//         timestamps:false,
//         modelName: 'user_roles',
//     },
// )

// module.exports = roleUser