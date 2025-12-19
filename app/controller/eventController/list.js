const db = require('../../models');
const JWt = require('jsonwebtoken');
const getMessages = require('../../utils/getMessages');
const { model } = require('mongoose');

exports.list= async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = JWt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!token) {
            return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
        }
        const events = await db.Event.findAll({ where: { creator_id: userId } });
        const invitations = await db.Invitation.findAll({ where: { invitee_email: decoded.email } },
           { attributes: ['event_name']},
           {include: [{ model: db.User, as: 'Inviter', attributes: ['name', 'email'] }]}
        );
        return res.status(200).json({ events, invitations });
    }
    
    catch (error) {
        console.error('Error fetching events and invitations:', error);
        return res.status(500).json({ message: getMessages('SERVER_ERROR') });
    }
}