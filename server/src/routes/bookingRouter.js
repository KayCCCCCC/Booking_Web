const { BookingController } = require("../controller/bookingController");
const router = require("express").Router();

router.post("/create", BookingController.CreateBooking);
router.patch("/update/:id", BookingController.UpdateBookingStatus);
router.patch("/cancel/:id", BookingController.CancelBooking);
router.get("/get-all", BookingController.GetAllBookings);
router.get("/get-detail/:id", BookingController.GetBookingDetail);
router.get("/get-detail-user/:id", BookingController.GetBookingDetailOfUser);

module.exports = router;
