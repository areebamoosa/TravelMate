const prisma = require("../../prisma");

exports.getDestinationTours = async (req, res, next) => {
  const destinationId = parseInt(req.params.destinationId);

  try {
    const tours = await prisma.tour.findMany({
      where: {
        destinationId: destinationId,
      },
      include: {
        places: {
          include: {
            place: true,
          },
        },
      },
    });

    if (!tours) {
      const error = new Error("Tour not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({
        message: "Tours fetched successfully of this destination",
        tours,
      });
  } catch (err) {
    next(err);
  }
};
exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await prisma.tour.findMany({
      include: {
        places: {
          include: {
            place: true,
          },
        },
      },
    });

    if (!tours) {
      const error = new Error("Tour not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "All tours fetched successfully", tours });
  } catch (err) {
    next(err);
  }
};

exports.getSingleTour = async (req, res, next) => {
  const tourId = parseInt(req.params.tourId);

  try {
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
      include: {
        places: {
          include: {
            place: true,
          },
        },
      },
    });

    if (!tour) {
      const error = new Error("Tour not found");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ message: "Tour fetched successfully", tour });
  } catch (err) {
    next(err);
  }
};
