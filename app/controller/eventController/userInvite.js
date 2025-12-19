const db = require('../../models');
const JWt = require('jsonwebtoken');
const getMessages = require('../../utils/getMessages');

exports.eventInvite = async (req, res) => {
    try {
        const { eventName, inviteeEmail } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = JWt.verify(token, process.env.JWT_SECRET);
        const inviterId = decoded.userId;
        if (!token) {
            return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
        }

        const event = await db.Event.findOne({ where: { title: eventName } });
        if (!event) {
            return res.status(404).json({ message: getMessages('EVENT_NOT_FOUND') });
        }
        for (const inviteeEmail of invites) {
        const newInvitation = await db.Invitation.create({
            event_name: eventName,
            event_id: event.id,
            invitee_email: inviteeEmail,
            inviter_id: inviterId
        });
    }
        return res.status(201).json({ message: getMessages('INVITATION_SENT_SUCCESSFULLY'), invitation: newInvitation });
    }
    catch (error) {
        console.error('Error sending invitation:', error);
        return res.status(500).json({ message: getMessages('SERVER_ERROR') });
    }
}