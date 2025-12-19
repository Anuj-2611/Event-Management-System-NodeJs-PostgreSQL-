const bcrypt = require("bcrypt");
const db = require("../../../models");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id
    });

  } catch (err) {
    console.error("Register error:", err); // 🔥 IMPORTANT for debugging
    return res.status(500).json({ message: "Server error" });
  }
};
