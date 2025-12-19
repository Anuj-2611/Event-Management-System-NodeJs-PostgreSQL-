const db = require('../../../models');
const JWt = require('jsonwebtoken');
const getMessages = require('../../../utils/getMessages');
const { Op } = require('sequelize');
const { use } = require('../../../routes/auth.routes');

exports.myEventList = async (req, res) => {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 5;
        if (!req.headers.authorization) {
            return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
        }
        const token = req.headers.authorization.split(' ')[1];

        const decoded = JWt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!token) {
            return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
        }

        const { startDate, endDate, search } = req.query;


        const whereCondition = {
            creator_id: userId
        };

        if (startDate && endDate) {
            whereCondition.date = {
                [Op.between]: [startDate, endDate]
            };
        } else if (startDate) {
            whereCondition.date = {
                [Op.gte]: startDate
            };
        } else if (endDate) {
            whereCondition.date = {
                [Op.lte]: endDate
            };
        }

        if (search) {
            whereCondition.title = {
                [Op.iLike]: `%${search}%`
            }
        }

        const events = await db.Event.findAll({
            where: whereCondition,
            order: [["title", "ASC"]],
            include: [
                {
                    model: db.Invitation,
                    as: 'invitations',
                    required: false,
                    include: [
                        {
                            model: db.User,
                            as: 'invitee',
                            attributes: ['name', 'email']
                        }]
                }],
            limit: limit,
            offset: skip,
        });

        return res.status(200).json({ events });

    }
    catch (error) {
        console.error('Error fetching events and invitations:', error);
        return res.status(500).json({ message: getMessages('SERVER_ERROR') });
    }
}