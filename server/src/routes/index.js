const router = require("express").Router();
const routerImages = require('./uploadRouter')
const authRouter = require("./authRouter")
const userRouter = require("./userRouter")
const roleRouter = require("./roleRouter")

router.use("/images", routerImages)
router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/role", roleRouter)

module.exports = router;