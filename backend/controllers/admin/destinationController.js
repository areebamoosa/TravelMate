const prisma = require("../../prisma");

exports.postDestination = async (req, res, next) => {
  const { city, country, description, image, latitude, longitude } = req.body;

  try {
    const destination = await prisma.destination.create({
      data: {
        city: city,
        country: country,
        description: description,
        image: image,
        latitude: latitude,
        longitude: longitude,
      },
    });
    return res
      .status(201)
      .json({ message: "Destination created successfully!", destination });
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleDestination = async (req, res, next) => {
  const destinationId = parseInt(req.params.destinationId);

  try {
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
    });

    return res
      .status(200)
      .json({ message: "Destination fetched successfully!", destination });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await prisma.destination.findMany();

    return res
      .status(200)
      .json({ message: "Destinations fetched successfully!", destinations });
  } catch (err) {
    console.log(err);
  }
};

exports.updateDestination = async (req, res, next) => {
  const destinationId = parseInt(req.params.destinationId);

  const {
    updatedCity,
    updatedCountry,
    updatedDescription,
    updatedImage,
    updatedLatitude,
    updatedLongitude,
  } = req.body;

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

    return res
      .status(200)
      .json({ message: "Destination fetched successfully!", destination });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteDestination = async (req, res, next) => {
  const destinationId = parseInt(req.params.destinationId);


  await prisma.destination.delete({
    where: { id: destinationId },
  });

  return res.status(201).json({ message: "Destination deleted successfully!" });
};
