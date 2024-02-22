const { UploadController } = require('../controller/uploadController')
const cloundinary = require('../utils/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const router = require("express").Router();

const storage = new CloudinaryStorage({
    cloudinary: cloundinary,
    params: {
        folder: 'Booking_Web',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});

const parser = multer({ storage: storage });

//router.post('/upload', parser.single('image'), UploadController.uploadImage)
router.post('/upload', parser.single('image'), UploadController.uploadSingleImage)
router.post('/upload_array', parser.array('images', 10), UploadController.uploadArrayImage);

module.exports = router