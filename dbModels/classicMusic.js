const {Sequelize,DataTypes,Model} = require('sequelize');
const db = require('../dbCreate/databaseCreate')
const Compositor = require('./compositor');
const Instrument = require('./instrument');
class ClassicMusic extends Model {}

ClassicMusic.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        publishedAt:{
            type: DataTypes.DATE,
            allowNull:true,
        }

    },
    {
        sequelize:db,
        timestamps:false,
        modelName: 'musicPieces',
    },
)

module.exports = ClassicMusic