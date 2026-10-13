const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/user/destinationController");
const placesController = require("../controllers/user/placesController");
const toursController = require("../controllers/user/tourController");
const bookingController = require("../controllers/user/bookingController");

const isAuth = require("../middlewares/auth")

// Destination routes

router.get("/destinations", destinationController.destinations);

router.get(
  "/destination/:destinationId",
  destinationController.getSingleDestination
);

// Places routes

router.get("/places/:destinationId", placesController.getDestinationPlaces);

router.get("/place/:placeId", placesController.getSinglePlace);



// Tours routes

router.get("/tours", toursController.getAllTours);

router.get("/tour/:tourId", toursController.getSingleTour);

router.get("/tours/:destinationId", toursController.getDestinationTours);

// Tour booking routes

router.get('/bookings', isAuth, bookingController.bookings)

module.exports = router;
