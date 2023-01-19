const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class musicInstrument extends Model {}

musicInstrument.init(
    {
        instrumentId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'instruments',
                key: 'id'
            }
        },
        musicId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'musicPieces',
                key: 'id'
            }
        }
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'musicToInstrument',
    },
)

module.exports = musicInstrument