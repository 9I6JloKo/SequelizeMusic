const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class musicGenre extends Model {}

musicGenre.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        genreId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'genres',
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
        modelName: 'musicGenres',
    },
)

module.exports = musicGenre