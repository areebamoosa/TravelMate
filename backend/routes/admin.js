const express = require("express");
const router = express.Router();

const destinationController = require("../controllers/admin/destinationController");
const placesController = require("../controllers/admin/placesController");
const blogController = require("../controllers/admin/blogController");

// Destination routes

router.post("/create-destination", destinationController.postDestination);

router.get("/destination/:destinationId", destinationController.getSingleDestination);

router.get("/destinations", destinationController.getAllDestinations);

router.put("/destination/:destinationId", destinationController.updateDestination);

router.delete("/delete-destination/:destinationId", destinationController.deleteDestination);

// Places routes

router.post("/create-place", placesController.createPlace);

router.get("/place/:placeId", placesController.getSinglePlace);

router.get("/places", placesController.getPlaces);

router.put("/update-place/:placeId", placesController.updatePlace);

router.delete("/delete-place/:placeId", placesController.deletePlace);


// Blog routes

router.post('/create-blog', blogController.postBlog )

router.get('/blog/:blogId', blogController.getSingleBlog)

router.get("/blogs", blogController.allBlogs)

router.put("/blog/:blogId", blogController.updateBlog)

router.delete("/blog/:blogId", blogController.deleteBlog)

module.exports = router;