const { RangeModelController } = require("../controller/rangeModelController");
const router = require("express").Router();

router.post("/auto-create-range-model", RangeModelController.AutoCreateRangeModel);


module.exports = router;
