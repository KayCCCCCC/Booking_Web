const router = require("express").Router();
const routerImages = require('./uploadRouter')
const authRouter = require("./authRouter")
const userRouter = require("./userRouter")

router.use("/images", routerImages)
router.use("/auth", authRouter)
router.use("/user", userRouter)

module.exports = router;