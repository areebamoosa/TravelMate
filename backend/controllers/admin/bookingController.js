const prisma = require("../../prisma");

exports.bookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany();

    return res
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings });
  } catch (err) {
    console.error("Fetch bookings error:", err);

    return next(err);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const tourId = req.body.tourId;
    const userId = req.user.id;

    if (!tourId || !userId) {
      const error = new Error("Tour ID and User Id are required");
      error.status = 400;
      return next(error);
    }

    const { date, travelers, totalPrice } = req.body;

    const booking = await prisma.booking.create({
      data: {
        userId,
        tourId,
        date: new Date(`${date}T00:00:00.000Z`),
        travelers,
        totalPrice,
      },
    });

    return res
      .status(201)
      .json({ message: "Booking created successfully", booking });
  } catch (err) {
    return next(err);
  }
};

exports.getSingleBooking = async (req, res, next) => {
  const bookingId = parseInt(req.params.bookingId);
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      const error = new Error("Bookings not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Booking details fetched successfully", booking });
  } catch (err) {
    return next(err);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  const bookingId = parseInt(req.params.bookingId);
  const { bookingStatus } = req.body;

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: bookingStatus,
      },
    });

    return res
      .status(200)
      .json({ message: "Booking status  updated successfully", booking });
  } catch (err) {
    return next(err);
  }
};
