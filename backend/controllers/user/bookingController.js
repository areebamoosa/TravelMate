const prisma = require("../../prisma");

exports.bookings = async (req, res, next) => {
  try {

    const userId = req.user.id
    const bookings = await prisma.booking.findMany({where :{userId: userId,}, include: {tour: true}});

    return res
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings });
  } catch (err) {
    console.error("Fetch bookings error:", err);

    return next(err);
  }
};