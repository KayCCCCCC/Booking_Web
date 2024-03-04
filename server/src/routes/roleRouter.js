const { RoleController } = require("../controller/roleController");
const router = require("express").Router();

router.post("/auto-create-role", RoleController.autoCreateRoles);

module.exports = router;