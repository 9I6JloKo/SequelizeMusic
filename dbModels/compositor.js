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
        fullName:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        dateOfBirth:{
            type: DataTypes.DATE,
            allowNull:true,
        }
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'compositors',
    },
)

module.exports = Compositor