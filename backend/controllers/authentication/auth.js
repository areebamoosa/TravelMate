const prisma = require("../../prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: email === "admin@gmail.com" ? "Admin" : "User",
      },
    });

    return res.json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.json({ message: "Logged In successfully!", role: user.role });
  } catch (err) {
    console.log(err);
  }
};

exports.me = async (req, res) => {
  return res.status(200).json({
    loggedIn: true,
  });
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("auth");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    return next(err);
  }
};
