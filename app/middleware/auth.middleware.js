const JWT = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization? req.headers.authorization : null;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

}

module.exports = authMiddleware;