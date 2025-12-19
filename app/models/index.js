const sequelize = require('../config/dataBase');

const db = {};
db.Sequelize = require('sequelize');
db.sequelize = sequelize;

// Models
db.User = require('./userModel')(sequelize);
db.Event = require('./eventModel')(sequelize);
db.Invitation = require('./invitaionModel')(sequelize);

// Associations
db.User.hasMany(db.Event, {
  foreignKey: 'creator_id',
  as: 'events'
});
db.Event.belongsTo(db.User, {
  foreignKey: 'creator_id',
  as: 'creator'
});

db.Event.hasMany(db.Invitation, {
  foreignKey: 'event_id',
  as: 'invitations'
});
db.Invitation.belongsTo(db.Event, {
  foreignKey: 'event_id',
  as: 'event'
});

db.User.hasMany(db.Invitation, {
  foreignKey: 'invitee_email',
  sourceKey: 'email',
  as: 'invitations'
});
db.Invitation.belongsTo(db.User, {
  foreignKey: 'invitee_email',
  targetKey: 'email',
  as: 'invitee'
});

module.exports = db;
