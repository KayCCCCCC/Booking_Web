const cloundinary = require('../utils/cloudinary')
const fs = require('fs')
class UploadController {
    static async uploadSingleImage(req, res) {
        try {
            const images = req.file.path;
            console.log('>>> check image: ', images);
            const result = await cloundinary.uploader.upload(images, {
                upload_preset: 'vnldjdbe',
                public_id: `unique_id_${Date.now()}`
            });
            return res.status(200).json({
                success: true,
                message: "Upload image success",
                datas: result
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                err: e,
                message: "Internal server error"
            });
        }
    }


    static async uploadArrayImage(req, res) {
        try {
            const images = req.files.map((file) => file.path);
            // console.log('>>> check image: ', images);

            const uploadPromises = images.map(async (img) => {
                const result = await cloundinary.uploader.upload(img, {
                    upload_preset: 'vnldjdbe',
                    public_id: `unique_id_${Date.now()}`
                });
                // console.log('>>> check result: ', result);

                return {
                    url: result.secure_url,
                    publicId: result.public_id
                };
            });

            const uploadImages = await Promise.all(uploadPromises);

            return res.status(200).json({
                success: true,
                message: "Upload image success",
                datas: uploadImages
            });
        } catch (e) {
            console.error('Error uploading images:', e);
            return res.status(500).json({
                success: false,
                error: e.message,
                message: "Internal server error"
            });
        }
    }




}

exports.UploadController = UploadController