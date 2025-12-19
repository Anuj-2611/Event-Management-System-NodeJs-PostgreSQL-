const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/dataBase');

module.exports = (sequelize) => {
class Invitation extends Model {}

Invitation.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    event_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    event_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    invitee_email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    inviter_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    },
    {
    sequelize,
    modelName: 'Invitation',
    tableName: 'invitations',
    timestamps: true
    }
)
    return Invitation;
}
