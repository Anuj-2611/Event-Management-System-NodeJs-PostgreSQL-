const {Model , DataTypes} = require('sequelize');
const sequelize = require('../config/dataBase');

module.exports = (sequelize) => {
class Event extends Model {}

Event.init(
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
	title:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
	description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
	creator_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    },
    {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: true
    }
)
    return Event;
}