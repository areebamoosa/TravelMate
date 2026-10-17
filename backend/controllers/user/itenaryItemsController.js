const prisma = require("../../prisma");

exports.createTrip = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const { title, startDate, endDate, destinationId, days } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({
        message: "End date cannot be before the start date.",
      });
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        days: Number(days),
        user: {
          connect: { id: userId },
        },
        destination: {
          connect: { id: Number(destinationId) },
        },
      },
    });

    return res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getMyTrips = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const trips = await prisma.trip.findMany({
      where: { userId },
      include: { destination: true },
    });

    return res.status(200).json({
      message:
        trips.length === 0
          ? "No trips found for this user"
          : "Trips fetched successfully",
      trips,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getTripDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tripId = parseInt(req.params.tripId);

    const trip = await prisma.trip.findFirst({
      where: { userId: userId, id: tripId },
      include: {
        itenaryItems: {
          include: {
            place: true,
          },
        },
        destination: {
          include: {
            places: true,
          },
        },
      },
    });

    if (!trip) {
      return res.json({ message: "Trip not found for this user" });
    }

    return res.status(200).json({
      message: "Trip fetched successfully",
      trip,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const tripId = Number(req.params.tripId);
    const { title, startDate, endDate, destinationId, days } = req.body;

    const existingTrip = await prisma.trip.findFirst({
      where: { id: tripId, userId },
    });

    if (!existingTrip) {
      return res.status(404).json({
        message: "Trip not found for this user",
      });
    }

    const trip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        days: Number(days),
        destination: {
          connect: { id: Number(destinationId) },
        },
      },
    });

    return res.json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tripId = Number(req.params.tripId);

    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId },
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found for this user",
      });
    }

    await prisma.trip.delete({
      where: { id: tripId },
    });

    return res.json({
      message: "Trip deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
};

exports.schedeuleDays = async (req, res, next) => {
  const userId = req.user.id;
  const { placeId, title, day, notes } = req.body;
  const tripId = parseInt(req.params.tripId);

  try {
    const trip = await prisma.trip.findFirst({
      where: { userId: userId, id: tripId },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const selectedDay = Number(day);

    if (selectedDay < 1 || selectedDay > trip.days) {
      return res
        .status(400)
        .json({ message: "Day must be within range of trip days" });
    }

    const existingSchedule = await prisma.itenaryItem.findFirst({
      where: {
        tripId: tripId,
        day: selectedDay,
      },
    });

    if (existingSchedule) {
      return res.status(400).json({
        message: "This day has already been scheduled",
      });
    }

    const place = await prisma.place.findFirst({
      where: { id: placeId, destinationId: trip.destinationId },
    });

    if (!place) {
      return res.json({ message: "Place not found for this destination" });
    }

    const itenaryItem = await prisma.itenaryItem.create({
      data: {
        tripId: tripId,
        placeId: placeId,
        title: title,
        notes,
        day: selectedDay,
      },
    });

    return res.status(201).json({
      message: "Day scheduled successfully",
      itenaryItem,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllSchedules = async (req, res, next) => {
  try {
    const tripId = parseInt(req.params.tripId);

    const tripSchedules = await prisma.itenaryItem.findMany({
      where: { tripId: tripId },
      include: { place: true },
    });

    if (!tripSchedules || tripSchedules.length === 0) {
      return res
        .status(404)
        .json({ message: "No schedules found for this trip" });
    }

    return res.json({
      message: "Schedules fetched successfully",
      tripSchedules,
    });
  } catch (err) {
    return next(err);
  }
};
