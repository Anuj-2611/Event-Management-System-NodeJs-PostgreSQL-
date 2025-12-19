const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../../../models');
const getMessages = require("../../../utils/getMessages");


exports.changePassword = async (req, res) => {
    const jwtToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    console.log("JWT Token:", jwtToken , req.session.jwt); 
    try{
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        if(req.session.jwt !== jwtToken && req.session.userId !== decoded.userId){
            return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
        }
        const userId = decoded.userId;

        const newPassword = req.body;

        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: getMessages('USER_NOT_FOUND') });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.json({ message: getMessages('PASSWORD_CHANGED_SUCCESS') });
    }
    catch(err){
        return res.status(500).json({ message: getMessages('SERVER_ERROR') });
    }
}