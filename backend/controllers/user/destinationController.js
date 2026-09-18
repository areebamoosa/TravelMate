const prisma = require("../../prisma");

exports.destinations = async  (req, res, next) => {
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
}

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


//   exports.searchDestination = async (req, res, next) => {}
//   exports.filterDestinatiion = async (req, res, next) => {}
