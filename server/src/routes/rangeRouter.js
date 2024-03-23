const { RangeController } = require("../controller/rangeController");
const router = require("express").Router();

router.post("/create", RangeController.CreateRange);
router.post("/update/:id", RangeController.UpdateRange);
router.post("/delete/:id", RangeController.DeleteRange);
router.post("/get-all", RangeController.GetAllRanges);
router.post("/get/:id", RangeController.GetRangeById);
router.post("/auto-create", RangeController.AutoCreateRange);

module.exports = router;
