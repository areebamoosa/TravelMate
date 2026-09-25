const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/user/destinationController");
const placesController = require("../controllers/user/placesController");

// Destination routes

router.get("/destinations", destinationController.destinations);

router.get(
  "/destination/:destinationId",
  destinationController.getSingleDestination
);

// Places routes

router.get("/places/:destinationId", placesController.getDestinationPlaces);

router.get("/place/:placeId", placesController.getSinglePlace);

module.exports = router;
