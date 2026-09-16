exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  console.log(err);

  const message =
    statusCode === 500
      ? "Something went wrong please try again"
      : err.message || "Something went wrong";

  return res.status(statusCode).json({ success: false, message: message });
};

exports.notFound = (req, res, next) => {
  const error = new Error("Page not found");
  error.statusCode = 404;

  return next(error);
};