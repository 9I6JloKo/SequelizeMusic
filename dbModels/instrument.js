const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class Instrument extends Model {}

Instrument.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        instrumentName:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        typeOfInstrument:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'instrumentTypes',
                key: 'id'
            }
        }
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'instruments',
    },
)

module.exports = Instrument