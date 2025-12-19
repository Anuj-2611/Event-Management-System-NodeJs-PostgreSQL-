const {Model , DataTypes} = require('sequelize');
const sequelize = require('../config/dataBase');
const { model } = require('mongoose');

module.exports = (sequelize) => {
class User extends Model {}

User.init(
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
	name:{
        type: DataTypes.STRING,
        allowNull: false
    },
	email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
	password:{
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
    }
)
 return User;
}