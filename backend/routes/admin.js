const express = require("express");
const router = express.Router();

const destinationController = require("../controllers/admin/destinationController");
const placesController = require("../controllers/admin/placesController");
const blogController = require("../controllers/admin/blogController");
const tourController = require("../controllers/admin/toursController");
const bookingController = require("../controllers/admin/bookingController");
const weatherController = require("../controllers/admin/weatherController");

const isAuth = require("../middlewares/auth")
const checkRole = require("../middlewares/checkRole")

const upload = require("../middlewares/upload")

// Destination routes

router.post("/create-destination", upload.single("image"), isAuth, checkRole ,destinationController.postDestination);

router.get("/destinations", isAuth, checkRole, destinationController.getAllDestinations);

router.get("/destination/:destinationId", isAuth, checkRole, destinationController.getSingleDestination);

router.put("/destination/:destinationId", isAuth, checkRole, destinationController.updateDestination);

router.delete("/delete-destination/:destinationId", isAuth, checkRole, destinationController.deleteDestination);

// Places routes

router.post("/places/create-place", upload.single('image'),isAuth, checkRole, placesController.createPlace);

router.get("/place/:placeId", isAuth, checkRole, placesController.getSinglePlace);

router.get("/places", isAuth, checkRole, placesController.getPlaces);

router.put("/update-place/:placeId",  isAuth, checkRole, placesController.updatePlace);

router.delete("/delete-place/:placeId", isAuth, checkRole, placesController.deletePlace);


// Blog routes

router.post('/blogs/create-blog', upload.single("image"), isAuth, checkRole, blogController.postBlog )

router.get("/blogs", isAuth, checkRole, blogController.allBlogs)

router.get('/blog/:blogId', isAuth, checkRole, blogController.getSingleBlog)

router.put("/blog/:blogId",upload.single("image"), isAuth, checkRole, blogController.updateBlog)

router.delete("/blog/:blogId", isAuth, checkRole, blogController.deleteBlog)




// Booking routes

router.get('/tour/bookings', isAuth, checkRole, bookingController.bookings)

router.get('/tour/booking/:bookingId', isAuth, checkRole, bookingController.getSingleBooking)

router.put('/tour/booking/:bookingId',isAuth, checkRole, bookingController.updateBookingStatus)

router.post('/tour/booking',isAuth, checkRole, bookingController.createBooking)




// Tour routes

router.post("/tours/create-tour", upload.single("image"), isAuth, checkRole, tourController.createTour)

router.get('/tour/:tourId', isAuth, checkRole, tourController.getSingleTour)

router.get('/tours', isAuth, checkRole, tourController.getAllTours)

router.put('/tour/:tourId', upload.single("image"), isAuth, checkRole, tourController.updateTour)

router.delete('/tour/:tourId',isAuth, checkRole, tourController.deleteTour)


router.get('/weather', weatherController.getWeather)

module.exports = router;