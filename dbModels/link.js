const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class Link extends Model {}

Link.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        music_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'classicMusics',
                key: 'id'
            }
        },
        link_string:{
            type: DataTypes.STRING(100),
            allowNull:false
        }
    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'links'
    },
)

module.exports = Link