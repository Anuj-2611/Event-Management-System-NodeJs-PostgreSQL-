const db = require('../../models');
const getMessages = require('../../utils/getMessages');


exports.eventDetails = async (req, res) => {
  try {
    const event = req.body.event;
    const events = db.Event;
    console.log(event);
    const eventDetails = await events.findAll({
      where: { title: event },
      attributes: ["title", "description"],
      include: {
        model: db.Invitation,
        as: "invitations",
        required: false
      }
    })

    return res.status(200).json({ eventDetails });
  }
  catch (error) {
    console.error('Error fetching events and invitations:', error);
    return res.status(500).json({ message: getMessages('SERVER_ERROR') });
  }

};
