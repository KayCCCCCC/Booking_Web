const { ModelController } = require("../controller/modelController");
const cloundinary = require('../utils/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const router = require("express").Router();

const storage = new CloudinaryStorage({
    cloudinary: cloundinary,
    params: {
        folder: 'Booking_Web',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.filename,
    },
});

const parser = multer({ storage: storage });

router.post("/auto-create-model-type", ModelController.AutoCreateModalType)
router.post("/create", parser.array('images', 10), ModelController.CreateModel)
router.get("/getBy/:id", ModelController.GetModelById)
router.patch("/update/:id", parser.array('images', 10), ModelController.UpdateModel)
router.delete("/delete/:id", ModelController.DeleteModel)
router.get("/get-all", ModelController.GetAllModels)
router.post("/auto-create-model", ModelController.AutoCreate)

module.exports = router;