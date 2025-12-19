const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../../../models');
const getMessages = require("../../../utils/getMessages");
const { get } = require("http");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: getMessages('USER_NOT_FOUND') });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: getMessages('UNAUTHORIZED') });
    }

    const token = jwt.sign(
      { userId: user.id, 
       email: email},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    req.session.userId = user.id;
    req.session.jwt = token;
    console.log("Session after login:", req.session);
    return res.status(200).json({
      message:  getMessages('LOGIN_SUCCESS'),
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: getMessages('SERVER_ERROR') });
  }
};
