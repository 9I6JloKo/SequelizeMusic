const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class Period extends Model {}

Period.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        period_name:{
            type: DataTypes.STRING(100),
            allowNull:false,
            // unique: true
        },
        desc:{
            type: DataTypes.STRING(1000),
            allowNull:false
        },
        startDate:{
            type: DataTypes.DATE,
            allowNull:true,
        },
        endDate:{
            type: DataTypes.DATE,
            allowNull:true,
        }

    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'periods'
    },
)

module.exports = Period