// const {Sequelize,DataTypes,Model} = require('sequelize');
// const db = require('../dbCreate/databaseCreate')
// class musicCompositor extends Model {}

// musicCompositor.init(
//     {
//         compositorId:{
//             type: DataTypes.STRING(100),
//             allowNull:false,
//             primaryKey: true,
//             references: {
//                 model: 'compositors',
//                 key: 'id'
//             }
//         },
//         musicId:{
//             type: DataTypes.STRING(100),
//             allowNull:false,
//             primaryKey: true,
//             references: {
//                 model: 'pieces_ofClassicMusic',
//                 key: 'id'
//             }
//         }
//     },
//     {
//         sequelize:db,
//         timestamps:false,
//         modelName: 'musicToCompositor',
//     },
// )

// module.exports = musicCompositor