const router = require("express").Router();
const routerImages = require('./uploadRouter')

router.use("/images", routerImages)

module.exports = router;