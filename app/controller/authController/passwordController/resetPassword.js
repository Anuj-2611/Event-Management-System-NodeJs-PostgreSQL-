const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../../../models/userModel');
const getMessages = require("../../../utils/getMessages");

exports.resetPassword = async (req, res) => {
    const { email,oldPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
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
        return res.json({ message: getMessages('PASSWORD_RESET_SUCCESS') });
    }
    catch (err) {
        return res.status(500).json({ message: getMessages('SERVER_ERROR') });
    }
}