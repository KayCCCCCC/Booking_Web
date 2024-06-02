const router = require("express").Router();
const routerImages = require('./uploadRouter')
const authRouter = require("./authRouter")
const userRouter = require("./userRouter")
const roleRouter = require("./roleRouter")
const modelRouter = require("./modelRouter")
const rangeRouter = require("./rangeRouter")
const rangeModelRouter = require('./rangeModelRouter')
const bookingRouter = require('./bookingRouter')
const blogRouter = require('./blogRouter')
const paymentRouter = require('./paymentRouter')

router.use("/images", routerImages)
router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/role", roleRouter)
router.use("/model", modelRouter)
router.use("/range", rangeRouter)
router.use("/range-model", rangeModelRouter)
router.use("/booking", bookingRouter)
router.use("/blog", blogRouter)
router.use("/payment", paymentRouter)

module.exports = router;