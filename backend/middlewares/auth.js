const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.auth;
    if (!token) {
      return res.status(401).json({
        message: "Please log in first."
    });

    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
   return next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again."
  });

  }
};
