const getMessages = require("../../../utils/getMessages");
exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ message: getMessages('LOGOUT_FAIL') });
        }
        return res.json({ message: getMessages('LOGOUT_SUCCESSFUL') });
    });
}