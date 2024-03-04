const { UserController } = require("../controller/userController");
const cloundinary = require('../utils/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { authMiddleWare, authUserMiddleWare } = require("../middlewares/AuthMiddleWare");
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

router.get("/get-all", authMiddleWare, UserController.GetAll);
router.get("/get/:id", authUserMiddleWare, UserController.GetById);
router.post("/create", authMiddleWare, parser.single('avatar'), UserController.CreateUser);
router.patch("/update/:id", authMiddleWare, parser.single('avatar'), UserController.UpdateUser);
router.patch("/delete/:id", authMiddleWare, UserController.DeleteUser)
router.post("/auto-create-user", UserController.AutoCreateUser)

module.exports = router