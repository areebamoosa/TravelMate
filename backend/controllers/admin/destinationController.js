const prisma = require("../../prisma");

exports.postDestination = async (req, res, next) => {
  const { city, country, description, latitude, longitude, places } = req.body;

  try {
    const destination = await prisma.destination.create({
      data: {
        city: city,
        country: country,
        description: description,
        image: req.file.path,
        latitude: latitude,
        longitude: longitude,

      },
    });
    return res
      .status(201)
      .json({ message: "Destination created successfully!", destination });
  } catch (err) {
    next(err);
  }
};

exports.getSingleDestination = async (req, res, next) => {
  const destinationId = parseInt(req.params.destinationId);

  try {
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
    });

    if (!destination) {
      const error = new Error("Destination not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Destination fetched successfully!", destination });
  } catch (err) {
    next(err);
  }
};

exports.getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await prisma.destination.findMany();

    if (!destinations) {
      const error = new Error("Destinations not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Destinations fetched successfully!", destinations });
  } catch (err) {
    next(err);
  }
};

exports.updateDestination = async (req, res, next) => {
  const destinationId = parseInt(req.params.destinationId);

  const {
    updatedCity,
    updatedCountry,
    updatedDescription,
    updatedLatitude,
    updatedLongitude,
  } = req.body;

  const updatedImage = req.file.path

  try {
    const destination = await prisma.destination.update({
      where: { id: destinationId },
      data: {
        city: updatedCity,
        country: updatedCountry,
        description: updatedDescription,
        image: updatedImage,
        latitude: updatedLatitude,
        longitude: updatedLongitude,
      },
    });

    if (!destination) {
      const error = new Error("Destination not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Destination updated successfully!", destination });
  } catch (err) {
    next(err);
  }
};

exports.deleteDestination = async (req, res, next) => {
  try {
    const destinationId = parseInt(req.params.destinationId);

    const destination = await prisma.destination.delete({
      where: { id: destinationId },
    });

    if (!destination) {
      const error = new Error("Destination not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(201)
      .json({ message: "Destination deleted successfully!" , destinationId: destination.id });
  } catch (err) {
    next(err);
  }
};
