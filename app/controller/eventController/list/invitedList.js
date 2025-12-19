const db = require('../../../models');
const JWT = require('jsonwebtoken');
const getMessages = require('../../../utils/getMessages');

exports.invitedList = async (req, res) => {
  try {

    if (!req.headers.authorization) {
      return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    const { params: { skip = 0, limit = 10 } } = req;

    const events = await db.Event.findAll({
      where: { creator_id: userId }
    });

    const invitations = await db.Invitation.findAll({
      where: { invitee_email: decoded.email },
      attributes: ['event_name'],
      include: [
        {
          model: db.User,
          as: 'Inviter',
          attributes: ['name', 'email']
        }
      ],
      limit,
      skip
    });

    return res.status(200).json({
      events,
      invitations
    });

  } catch (error) {
    console.error('Error fetching events and invitations:', error);
    return res.status(500).json({ message: getMessages('SERVER_ERROR') });
  }
};
