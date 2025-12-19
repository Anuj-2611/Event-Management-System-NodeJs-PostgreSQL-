const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../../../models');
const getMessages = require("../../../utils/getMessages");

exports.updatePassword = async (req, res) => {
    try{
        const email = req.body.email;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: getMessages('USER_NOT_FOUND') });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: getMessages('OLD_PASSWORD_INCORRECT') });
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