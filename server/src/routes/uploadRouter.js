const { UploadController } = require('../controller/uploadController')
const cloundinary = require('../utils/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const router = require("express").Router();
const upload = require('../utils/storageImg')

// const storage = new CloudinaryStorage({
//     cloudinary: cloundinary,
//     params: {
//         folder: 'Booking_Web',
//         format: async (req, file) => 'png', // supports promises as well
//         public_id: (req, file) => file.filename,
//     },
// });

// const parser = multer({ storage: storage });

//router.post('/upload', parser.single('image'), UploadController.uploadImage)
router.post('/upload', upload.single('image'), UploadController.uploadSingleImage)
router.post('/upload_array', upload.array('images'), UploadController.uploadArrayImage);

module.exports = router