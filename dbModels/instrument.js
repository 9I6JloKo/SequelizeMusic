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
        pictureInstrument:{
            type: DataTypes.STRING(1000),
            allowNull:true,
        },
        typeOfInstrument:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'instrumentTypes',
                key: 'id',
                onDelete: 'CASCADE'
            }
        },
        publishedAt:{
            type: DataTypes.DATE,
            allowNull:true,
        }
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'instruments',
    },
)

module.exports = Instrument