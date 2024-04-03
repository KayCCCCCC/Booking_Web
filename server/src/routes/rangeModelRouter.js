const { RangeModelController } = require("../controller/rangeModelController");
const router = require("express").Router();

router.post("/auto-create-range-model", RangeModelController.AutoCreateRangeModel);
router.get("/get-type-model-hotel/:id", RangeModelController.GetAllRoomOfHotel);


module.exports = router;
