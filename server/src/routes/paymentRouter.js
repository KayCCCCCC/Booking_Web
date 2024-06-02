const { PaymentController } = require("../controller/paymentController");

const router = require("express").Router();

router.get("/config", PaymentController.GetStripeKey)
router.post("/create-payment-intent", PaymentController.CreateInTent)
router.post("/confirm-payment", PaymentController.ConfirmPayment)
router.get("/success/:sessionId", PaymentController.CheckSuccess)

module.exports = router;