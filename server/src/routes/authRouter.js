const { AuthController } = require("../controller/authController");

const router = require("express").Router();
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/first-step-registeration", AuthController.firstStepRegisteration);
router.post("/submitOTP", AuthController.submitOTP);
router.post("/setInfo", AuthController.setInfo);
router.get('/refresh_token', AuthController.refresh_token);
module.exports = router;
