const express = require("express")
const router = express.Router();
const destinationController = require("../controllers/user/destinationController")

// Destination routes

router.get("/destinations", destinationController.destinations);

router.get("/destination/:destinationId", destinationController.getSingleDestination)

module.exports = router;