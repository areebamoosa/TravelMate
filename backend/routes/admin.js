const express = require("express");
const router = express.Router();

const destinationController = require("../controllers/admin/destinationController");
const placesController = require("../controllers/admin/placesController");
const blogController = require("../controllers/admin/blogController");
const tourController = require("../controllers/admin/toursController");
const bookingController = require("../controllers/admin/bookingController");
const weatherController = require("../controllers/admin/weatherController");

const isAuth = require("../middlewares/auth")

const upload = require("../middlewares/upload")

// Destination routes

router.post("/create-destination", upload.single("image") ,destinationController.postDestination);

router.get("/destinations", destinationController.getAllDestinations);

router.get("/destination/:destinationId", destinationController.getSingleDestination);

router.put("/destination/:destinationId", destinationController.updateDestination);

router.delete("/delete-destination/:destinationId", destinationController.deleteDestination);

// Places routes

router.post("/places/create-place", upload.single('image'), placesController.createPlace);

router.get("/place/:placeId", placesController.getSinglePlace);

router.get("/places", placesController.getPlaces);

router.put("/update-place/:placeId", placesController.updatePlace);

router.delete("/delete-place/:placeId", placesController.deletePlace);


// Blog routes

router.post('/blogs/create-blog', blogController.postBlog )

router.get("/blogs", blogController.allBlogs)

router.get('/blog/:blogId', blogController.getSingleBlog)

router.put("/blog/:blogId", blogController.updateBlog)

router.delete("/blog/:blogId", blogController.deleteBlog)




// Booking routes

router.get('/tour/bookings', bookingController.bookings)

router.get('/tour/booking/:bookingId', bookingController.getSingleBooking)

router.put('/tour/booking/:bookingId', bookingController.updateBookingStatus)

router.post('/tour/booking',isAuth, bookingController.createBooking)




// Tour routes

router.post("/tours/create-tour", upload.single("image"), tourController.createTour)

router.get('/tour/:tourId', tourController.getSingleTour)

router.get('/tours', tourController.getAllTours)

router.put('/tour/:tourId', tourController.updateTour)

router.delete('/tour/:tourId', tourController.deleteTour)


router.get('/weather', weatherController.getWeather)

module.exports = router;