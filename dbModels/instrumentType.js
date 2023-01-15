const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class InstrumentType extends Model {}

InstrumentType.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        typeName:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'instrumentTypes',
    },
)

module.exports = InstrumentType