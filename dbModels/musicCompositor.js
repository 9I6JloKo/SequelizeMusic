const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class musicCompositor extends Model {}

musicCompositor.init(
    {
        compositorId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'compositors',
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
        modelName: 'musicToCompositor',
    },
)

module.exports = musicCompositor