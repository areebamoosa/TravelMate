
const prisma = require("../../prisma");

exports.getDestinationPlaces = async (req, res, next) => {

  const destinationId = parseInt(req.params.destinationId)
    try {
      const places = await prisma.place.findMany({where: {destinationId: destinationId}});
  
      if (!places) {
        const error = new Error("Places not found");
        error.status = 404;
        return next(error);
      }
  
      return res
        .status(200)
        .json({ message: "Places of this destination found successfully", places });
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
  
  