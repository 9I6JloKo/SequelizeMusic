const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
class Genre extends Model {}

Genre.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genre_name:{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique: true
        },
        descGenre:{
            type: DataTypes.STRING(1000),
            allowNull:false
        },
        publishedAt:{
            type: DataTypes.DATE,
            allowNull:true,
        }

    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'genres'
    },
)

module.exports = Genre