module.exports = (req, res, next) => {

  if (req.user.role !== "Admin") {
    return res
      .status(403)
      .json({ message: "You are not authorised to access this page." });
  }

  return next()
};
