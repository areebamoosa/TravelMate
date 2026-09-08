const prisma = require("../../prisma");

exports.createPlace = async (req, res, next) => {
  const { name, description, image, category, latitude, longitude } = req.body;

  try {
    const place = await prisma.place.create({
      data: {
        name,
        description,
        image,
        category,
        latitude,
        longitude,
      },
    });

    return res
      .status(201)
      .json({ message: "Place created successfully", place });
  } catch (err) {
    console.log(er);
  }
};

exports.getSinglePlace = async (req, res, next) => {
  const placeId = parseInt(req.params.placeId);

  try {
    const place = await prisma.place.findUnique({ where: { id: placeId } });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res.status(200).json({ message: "Place found successfully", place });
  } catch (error) {
    console.log(er);
  }
};

exports.getPlaces = async (req, res, next) => {
  try {
    const places = await prisma.place.findMany();

    if (!places) {
      return res.status(404).json({ message: "Places not found" });
    }

    return res
      .status(200)
      .json({ message: "Places found successfully", places });
  } catch (err) {
    console.log(err);
  }
};

exports.updatePlace = async (req, res, next) => {
  const placeId = parseInt(req.params.placeId);
  const updatedName = req.body.updatedName;
  const updatedDescription = req.body.updatedName;
  const updatedImage = req.body.updatedName;
  const updatedCategory = req.body.updatedName;
  const updatedLatitude = req.body.updatedName;
  const updatedLongitude = req.body.updatedName;

  try {
    const place = await prisma.place.update({
      data: {
        name: updatedName,
        description: updatedDescription,
        image: updatedImage,
        category: updatedCategory,
        longitude: updatedLongitude,
        latitude: updatedLatitude,
      },
      where: { id: placeId },
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res
      .status(200)
      .json({ message: "Place updated successfully", place });
  } catch (error) {
    console.log(er);
  }
};

exports.deletePlace = async (req, res, next) => {
  const placeId = parseInt(req.params.placeId);

  try {
    const place = await prisma.place.delete({ where: { id: placeId } });
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    return res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    console.log(er);
  }
};

exports.categoryPlace = async (req, res, next) => {};
