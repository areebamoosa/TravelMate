const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin/destinationController");

router.post("/create-destination", adminController.postDestination);

router.get("/destination/:destinationId", adminController.getSingleDestination);

router.get("/destinations", adminController.getAllDestinations);

router.put("/destination/:destinationId", adminController.updateDestination);

router.delete("/delete-destination/:destinationId", adminController.deleteDestination);

module.exports = router;
