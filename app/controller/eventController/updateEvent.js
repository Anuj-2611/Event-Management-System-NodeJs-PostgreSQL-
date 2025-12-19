const db = require('../../models');
const JWT = require('jsonwebtoken');
const getMessages = require('../../utils/getMessages');

exports.updateEvent = async (req, res) => {
  try {

    if (!req.headers.authorization) {
      return res.status(401).json({
        message: getMessages('UNAUTHORIZED')
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { title, description, date } = req.body;


    const event = await db.Event.findOne({
      where: {
        title: title,
        creator_id: userId
      }
    });

    if (!event) {
      return res.status(404).json({
        message: 'Event not found or access denied'
      });
    }

    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;

    await event.save();

    return res.status(200).json({
      message: 'Event updated successfully',
      event
    });

  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({
      message: getMessages('SERVER_ERROR')
    });
  }
};
