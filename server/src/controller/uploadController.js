const cloundinary = require('../utils/cloudinary')
class UploadController {
    static async uploadSingleImage(req, res) {
        try {
            console.log('111111:', req.file)
            const images = req.file.path
            console.log('>>> check image: ', images)
            const result = await cloundinary.uploader.upload(images, {
                upload_preset: 'vnldjdbe',
            });
            return res.status(200).json({
                message: "Upload image success",
                datas: result
            })
        } catch (e) {
            return res.status(500).json({
                err: e,
                message: "Internal server error"
            })
        }
    }

    static async uploadArrayImage(req, res) {
        try {
            const images = req.files.map((file) => file.path);
            console.log('>>> check image: ', images);

            const uploadImages = [];
            for (let img of images) {
                const result = await cloundinary.uploader.upload(img, {
                    upload_preset: 'vnldjdbe',
                    public_id: `unique_id_${Date.now()}`
                });
                console.log('>>> check result: ', result);

                uploadImages.push({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }

            return res.status(200).json({
                message: "Upload image success",
                datas: uploadImages
            });
        } catch (e) {
            console.error('Error uploading images:', e);
            return res.status(500).json({
                error: e.message,
                message: "Internal server error"
            });
        }
    }



}

exports.UploadController = UploadController