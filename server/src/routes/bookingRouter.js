const { BookingController } = require("../controller/bookingController");
const router = require("express").Router();

router.post("/create", BookingController.CreateBooking);

module.exports = router;
