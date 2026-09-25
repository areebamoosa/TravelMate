const prisma = require("../../prisma");

exports.createPlace = async (req, res, next) => {
  const {
    name,
    description,
    category,
    latitude,
    longitude,
    destinationId,
  } = req.body;

  const image = req.file.path;

  try {
    const place = await prisma.place.create({
      data: {
        name,
        description,
        image,
        category,
        latitude,
        longitude,
       destinationId: parseInt(destinationId),
      },
    });

    return res
      .status(201)
      .json({ message: "Place created successfully", place });
  } catch (err) {
    next(err);
  }
};

exports.getSinglePlace = async (req, res, next) => {
  const placeId = parseInt(req.params.placeId);

  try {
    const place = await prisma.place.findUnique({ where: { id: placeId } });

    if (!place) {
      const error = new Error("Place not found");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ message: "Place found successfully", place });
  } catch (error) {
    next(err);
  }
};

exports.getPlaces = async (req, res, next) => {
  try {
    const places = await prisma.place.findMany();

    if (!places) {
      const error = new Error("Places not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Places found successfully", places });
  } catch (err) {
    next(err);
  }
};

exports.updatePlace = async (req, res, next) => {
  const placeId = parseInt(req.params.placeId);
  const updatedName = req.body.updatedName;
  const updatedDescription = req.body.updatedDescription;
  const updatedImage = req.body.updatedImage;
  const updatedCategory = req.body.updatedCategory;
  const updatedLatitude = req.body.updatedLatitude;
  const updatedLongitude = req.body.updatedLongitude;
  const updatedDestinationId = req.body.destinationId;

  try {
    const place = await prisma.place.update({
      data: {
        name: updatedName,
        description: updatedDescription,
        image: updatedImage,
        category: updatedCategory,
        longitude: updatedLongitude,
        latitude: updatedLatitude,
        destinationId: updatedDestinationId,
      },
      where: { id: placeId },
    });

    if (!place) {
      const error = new Error("Place not found");
      error.status = 404;
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Place updated successfully", place });
  } catch (error) {
    next(err);
  }
};

exports.deletePlace = async (req, res, next) => {
  const placeId = parseInt(req.params.placeId);

  try {
    const place = await prisma.place.delete({ where: { id: placeId } });
    if (!place) {
      const error = new Error("Place not found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.categoryPlace = async (req, res, next) => {};
