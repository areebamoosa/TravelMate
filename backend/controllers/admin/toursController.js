const prisma = require("../../prisma");

exports.createTour = async (req, res, next) => {
  const {
    name,
    description,
    price,
    duration,
    destinationId,
    placeIds,
    durationUnit,
  } = req.body;

  const placeIdsAray = JSON.parse(placeIds);

  const image = req.file.path;
  try {
    const tour = await prisma.tour.create({
      data: {
        name: name,
        description: description,
        price: parseInt(price),
        image: image,
        duration: parseInt(duration),
        destinationId: parseInt(destinationId),
        durationUnit: durationUnit,

        places: {
          create: placeIdsAray.map((placeId) => ({
            place: {
              connect: {
                id: parseInt(placeId),
              },
            },
          })),
        },
      },
    });

    return res.status(201).json({ message: "Tour created successfully", tour });
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
        places: true,
      },
    });

    if (!tour) {
      const error = new Error("Tour not found");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ message: "Tour found successfully", tour });
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

    return res.status(200).json({ message: "Tours found successfully", tours });
  } catch (err) {
    next(err);
  }
};

exports.updateTour = async (req, res, next) => {
  const tourId = parseInt(req.params.tourId);
  const {
    updatedName,
    updatedDescription,
    updatedPrice,
    updatedDuration,
    destinationId,
    updatedPlaceIds,
  } = req.body;

  const placeIds = JSON.parse(updatedPlaceIds || []).map(Number)


  const existingTour = await prisma.tour.findUnique({
    where: { id: tourId }
  });


  const updatedImage = req.file ? req.file.path : existingTour.image ;

  try {
    const tour = await prisma.tour.update({
      where: { id: tourId },
      data: {
        name: updatedName,
        description: updatedDescription,
        price: Number(updatedPrice),
        image: updatedImage,
        duration: Number( updatedDuration),
        destination: {
          connect: { id: Number(destinationId) },
        },

      },
    });

    await prisma.tourPlace.deleteMany({ where: { tourId: tourId } });
    
    if (placeIds.length > 0) {
      await prisma.tourPlace.createMany({
        data: placeIds.map((placeId) => ({
          tourId,
          placeId,
        })),
      });
    }


    return res
      .status(200)
      .json({ message: "Tour updatedd successfully", tour });
  } catch (err) {
    next(err);
  }
};

exports.deleteTour = async (req, res, next) => {
  const tourId = parseInt(req.params.tourId);

  try {
    const tour = await prisma.tour.delete({ where: { id: tourId } });

    if (!tour) {
      const error = new Error("Tour not found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json({ message: "Tour deleted successfully", tour });
  } catch (err) {
    return next(err);
  }
};
