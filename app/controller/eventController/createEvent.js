const JWt = require('jsonwebtoken');
const db = require('../../models');
const getMessage = require('../../utils/getMessages');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date} = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = JWt.verify(token, process.env.JWT_SECRET);
    const creatorId = decoded.userId;
    console.log("Decoded token:", decoded);
    if(!token){
      return res.status(401).json({ message: getMessage('UNAUTHORIZED') });
    }
    const newEvent = await db.Event.create({
        title,
        description,
        date,
        creator_id: creatorId
    });

    const invites = req.body.invitees || [];
    for (const inviteeEmail of invites) {
        await db.Invitation.create({
            event_name: title,
            event_id: newEvent.id,
            invitee_email: inviteeEmail,
            inviter_id: creatorId
        });
    }

    return  res.status(201).json({ message: getMessage('EVENT_CREATED_SUCCESSFULLY'), event: newEvent });
  }
    catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ message: getMessage('SERVER_ERROR') });
  }
  
}