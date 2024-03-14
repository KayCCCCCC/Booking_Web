const { AuthController } = require("../controller/authController");
const upload = require('../utils/storageImg')
const router = require("express").Router();
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/first-step-registeration", AuthController.firstStepRegisteration);
router.post("/submitOTP", AuthController.submitOTP);
router.patch("/setInfo", upload.single('avatar'), AuthController.setInfo);
router.get('/refresh_token', AuthController.refresh_token);
router.post('/resend-otp', AuthController.ReSendOTP);
module.exports = router;
