const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class musicInstrument extends Model {}

musicInstrument.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
                model: 'classicMusics',
                key: 'id'
            }
        }
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'musicInstruments',
    },
)

module.exports = musicInstrument