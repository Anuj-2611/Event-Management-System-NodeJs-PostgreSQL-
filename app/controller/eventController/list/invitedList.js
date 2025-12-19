const db = require('../../../models');
const JWT = require('jsonwebtoken');
const getMessages = require('../../../utils/getMessages');
const { Op } = require('sequelize');

exports.invitedList = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const skip = Number(req.query.skip ?? 0);
    const limit = Number(req.query.limit ?? 10);
    const { search, startDate, endDate } = req.query;

    const invitationWhere = {
      invitee_email: decoded.email
    };

    if (search) {
      invitationWhere.event_name = {
        [Op.iLike]: `%${search}%` 
      };
    }

    const eventWhere = {};

    if (startDate && endDate) {
      eventWhere.date = {
        [Op.between]: [startDate, endDate]
      };
    } else if (startDate) {
      eventWhere.date = {
        [Op.gte]: startDate
      };
    } else if (endDate) {
      eventWhere.date = {
        [Op.lte]: endDate
      };
    }

    const invitations = await db.Invitation.findAll({
      where: invitationWhere,
      attributes: ['event_name'],
      include: [
        {
          model: db.Event,
          as: 'event',
          where: eventWhere,
          attributes: ['id', 'title', 'date']
        }
      ],
      order: [['event_name', 'ASC']],
      limit,
      offset: skip
    });

    return res.status(200).json({ invitations });

  } catch (error) {
    console.error('Error fetching invitations:', error);
    return res.status(500).json({ message: getMessages('SERVER_ERROR') });
  }
};
