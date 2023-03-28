const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class Instrument extends Model {}
const InstrumentType = require('../dbModels/instrumentType')

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
            // unique: true
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
    // Instrument.hasOne(InstrumentType, {foreignKey: 'id',sourceKey: 'typeOfInstrument'})
)

module.exports = Instrument