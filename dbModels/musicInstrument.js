// const {Sequelize,DataTypes,Model} = require('sequelize');
// const db = require('../dbCreate/databaseCreate')
// class musicInstrument extends Model {}

// musicInstrument.init(
//     {
//         instrumentId:{
//             type: DataTypes.STRING(100),
//             allowNull:false,
//             primaryKey: true,
//             references: {
//                 model: 'instruments',
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
//         modelName: 'musicToInstrument',
//     },
// )

// module.exports = musicInstrument