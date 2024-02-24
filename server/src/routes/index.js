const router = require("express").Router();
const routerImages = require('./uploadRouter')
const authRouter = require("./authRouter")

router.use("/images", routerImages)
router.use("/auth", authRouter)

module.exports = router;