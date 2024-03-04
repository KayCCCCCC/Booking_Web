const { faker } = require('@faker-js/faker');
const cloundinary = require('../utils/cloudinary')
const db = require('../model/index')

const Model = db.model
const ModelType = db.modelType
const ModelImages = db.model_images

class ModelController {
    static async AutoCreateModalType(req, res) {
        try {
            const listType = [
                "Flight",
                "Hotel",
                "Car"
            ]
            for (const item of listType) {
                await ModelType.create({
                    type: item,
                });
            }
            return res.status(200).json({ message: "Model types created successfully!" });
        } catch (error) {
            console.error("Error creating type:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async GetModelById(req, res) {
        try {
            const modelId = req.params.id;
            if (!modelId) {
                return res.status(400).json({
                    message: "ModelId is required"
                });
            } else {
                // Lấy danh sách hình ảnh từ bảng ModelImages
                const images = await ModelImages.findAll({
                    where: {
                        modelId: modelId
                    },
                    attributes: ["url", "publicId", "id"],
                });

                // Lấy thông tin của model từ bảng Model
                const result = await Model.findByPk(modelId, {
                    attributes: ["description", "address", "nameOfModel", "rate", "numberRate"],
                });

                if (result) {
                    result.images = images;

                    return res.status(200).json({
                        message: `Data of Model with Id ${modelId}`,
                        data: {
                            result,
                            images
                        }
                    });
                } else {
                    return res.status(400).json({
                        message: `Data of Model with Id ${modelId} not found`,
                    });
                }
            }
        } catch (error) {
            console.error("Error GetModelById:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async CreateModel(req, res) {
        try {
            const { description, address, nameOfModel, modelTypeId } = req.body;

            const images = req.files.map((file) => file.path);

            const uploadPromises = images.map(async (img) => {
                const result = await cloundinary.uploader.upload(img, {
                    upload_preset: 'vnldjdbe',
                    public_id: `unique_id_${Date.now()}`
                });

                return {
                    url: result.secure_url,
                    publicId: result.public_id
                };
            });

            const uploadImages = await Promise.all(uploadPromises);

            const result = await Model.create({
                description: description,
                address: address,
                nameOfModel: nameOfModel,
                modelTypeId: modelTypeId,
            });

            for (const img of uploadImages) {
                const saveImages = await ModelImages.create({
                    url: img.url,
                    publicId: img.publicId,
                    modelId: result?.dataValues?.id
                })
                console.log(saveImages)
            }

            res.status(200).json({
                message: "Create model successfully",
                data: result
            });
        } catch (error) {
            console.error("Error CreateModel:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async UpdateModel(req, res) {
        try {
            const modelId = req.params.id;
            const { description, address, rate, idImg } = req.body;

            const idImgs = idImg.split(',').map(Number);

            const model = await Model.findByPk(modelId);

            if (!model) {
                return res.status(404).json({ message: "Model not found" });
            }

            const images = req.files.map((file) => file.path);
            if (images) {
                const uploadPromises = images.map(async (img) => {
                    const result = await cloundinary.uploader.upload(img, {
                        upload_preset: 'vnldjdbe',
                        public_id: `unique_id_${Date.now()}`
                    });

                    return {
                        url: result.secure_url,
                        publicId: result.public_id
                    };
                });

                const uploadImages = await Promise.all(uploadPromises);

                for (let i = 0; i < idImgs.length; i++) {
                    let updateImg = await ModelImages.findOne({
                        where: {
                            id: idImgs[i],
                            modelId: modelId
                        }
                    });

                    if (!updateImg) {
                        // Create a new image if not found
                        updateImg = await ModelImages.create({
                            url: uploadImages[i].url,
                            publicId: uploadImages[i].publicId,
                            modelId: modelId
                        });
                    } else {
                        await cloundinary.uploader.destroy(updateImg.publicId);
                        await updateImg.update({
                            url: uploadImages[i].url,
                            publicId: uploadImages[i].publicId
                        });
                    }
                }
                // Create new ModelImages entries for remaining images
                for (let j = idImgs.length; j < uploadImages.length; j++) {
                    await ModelImages.create({
                        url: uploadImages[j].url,
                        publicId: uploadImages[j].publicId,
                        modelId: modelId
                    });
                }
            }

            // Update model information
            if (description) model.description = description;
            if (address) model.address = address;
            if (rate) {
                model.rate = rate;
                model.numberRate = (model.numberRate || 0) + 1; // Increment numberRate
            }

            // Save the updated model
            await model.save();

            // Return success response
            return res.status(200).json({
                message: "Model updated successfully",
                data: model
            });
        } catch (error) {
            console.error("Error UpdateModel:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async DeleteModel(req, res) {
        try {
            const modelId = req.params.id;

            const model = await Model.findByPk(modelId);

            if (!model) {
                return res.status(404).json({ message: "Model not found" });
            }

            await model.destroy();

            return res.status(200).json({
                message: "Model deleted successfully"
            });
        } catch (error) {
            console.error("Error DeleteModel:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async GetAllModels(req, res) {
        try {

            const models = await Model.findAll();

            return res.status(200).json({
                message: "Models retrieved successfully",
                data: models
            });
        } catch (error) {
            console.error("Error GetAllModels:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async AutoCreate(req, res) {
        try {
            const createdModels = [];
            for (let i = 0; i < 5; i++) {

                const description = faker.lorem.sentence();
                const address = faker.location.streetAddress();
                const nameOfModel = faker.company.name();

                // Create the model
                const newModel = await Model.create({
                    description: description,
                    address: address,
                    nameOfModel: nameOfModel,
                    modelTypeId: faker.number.int({ min: 1, max: 3 }),
                });

                createdModels.push(newModel);
                // Generate random images for the model
                const images = [];
                for (let j = 0; j < 3; j++) {

                    const imageUrl = faker.image.url();

                    const result = await cloundinary.uploader.upload(imageUrl, {
                        upload_preset: 'vnldjdbe',
                        public_id: `unique_id_${Date.now()}`
                    });

                    const createdImage = await ModelImages.create({
                        url: result.secure_url,
                        publicId: result.public_id,
                        modelId: newModel.id
                    });

                    images.push(createdImage);
                }
            }

            // Return success response with the created models
            return res.status(200).json({
                message: "Auto creation of 10 models with 6 images each successful",
                data: createdModels
            });
        } catch (error) {
            console.error("Error AutoCreate:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }
}
exports.ModelController = ModelController