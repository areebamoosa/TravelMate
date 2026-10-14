const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/user/destinationController");
const placesController = require("../controllers/user/placesController");
const toursController = require("../controllers/user/tourController");
const bookingController = require("../controllers/user/bookingController");
const itenaryItemController = require("../controllers/user/itenaryItemsController");
const isAuth = require("../middlewares/auth");

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

router.get("/bookings", isAuth, bookingController.bookings);

// Trip routes

router.post("/create-trip", isAuth, itenaryItemController.createTrip);

router.get("/my-trips", isAuth, itenaryItemController.getMyTrips);

router.put("/trip/:tripId", isAuth, itenaryItemController.updateTrip);

router.get("/trip/:tripId", isAuth, itenaryItemController.getTripDetails);

router.delete("/trip/:tripId", isAuth, itenaryItemController.deleteTrip);

router.post("/trip/:tripId/schedule-day", isAuth, itenaryItemController.schedeuleDays );

router.get( "/trip/:tripId/schedules", isAuth, itenaryItemController.getAllSchedules);

module.exports = router;
