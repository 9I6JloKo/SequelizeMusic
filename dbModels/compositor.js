const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class Compositor extends Model {}

Compositor.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        lastName:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        descCompositor:{
            type: DataTypes.STRING(1000),
            allowNull:false,
        },
        dateOfBirth:{
            type: DataTypes.DATE,
            allowNull:true,
        },
        dateOfDeath:{
            type: DataTypes.DATE,
            allowNull:true,
        },
        countryOfBirth:{
            type: DataTypes.STRING(100),
            allowNull:true,
        },
        photoCompositor:{
            type: DataTypes.STRING(1000),
            allowNull:true,
        },
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'compositors',
    },
)

module.exports = Compositor