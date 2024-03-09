const { faker } = require('@faker-js/faker');
const { Op, literal, col, fn } = require("sequelize");
const sequelize = require('../database/connectDbPg')
const cloundinary = require('../utils/cloudinary')
const db = require('../model/index')
const axios = require('axios')

const Model = db.model
const ModelType = db.modelType
const ModelImages = db.model_images
const Hotel = db.hotel
const Flight = db.flight
const Car = db.car

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
                    typeName: item,
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
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
            const listModel = response.data.data
            // console.log(listModel)

            const createdModels = [];
            for (const model of listModel) {

                const description = faker.lorem.sentence();
                const address = faker.location.streetAddress();
                const name = model.name;
                const latitude = parseFloat(model.lat);
                const longitude = parseFloat(model.long);
                const iso2 = model.iso2;

                // Create the model
                const newModel = await Model.create({
                    description: description,
                    address: address,
                    name: name,
                    iso2: iso2,
                    latitude: latitude,
                    longitude: longitude,
                    modelTypeId: faker.number.int({ min: 1, max: 3 }),
                    rate: Math.floor(faker.number.float({ min: 10, max: 50 }) / 10),
                    numberRate: faker.number.int({ min: 5, max: 10 }),
                    address_location: { type: 'Point', coordinates: [longitude, latitude] }
                });

                createdModels.push(newModel);
                // Generate random images for the model

                // const images = [];
                // for (let j = 0; j < 3; j++) {

                //     const imageUrl = faker.image.url();

                //     const result = await cloundinary.uploader.upload(imageUrl, {
                //         upload_preset: 'vnldjdbe',
                //         public_id: `unique_id_${Date.now()}`
                //     });

                //     const createdImage = await ModelImages.create({
                //         url: result.secure_url,
                //         publicId: result.public_id,
                //         modelId: newModel.id
                //     });

                //     images.push(createdImage);
                // }
            }

            // Return success response with the created models
            return res.status(200).json({
                message: "Auto create successful",
                data: createdModels
            });
        } catch (error) {
            console.error("Error AutoCreate:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async AutoCreateFlights(req, res) {
        try {
            const listModel = await Model.findAll({ where: { modelTypeId: 1 } });
            const createdFlights = [];
            for (const model of listModel) {
                const existModel = await Flight.findOne({ where: { modelId: model.id } })
                if (existModel == null) {
                    const departureTime = faker.date.future();
                    const arrivalTime = faker.date.future();
                    const origin = faker.location.city();
                    const destination = faker.location.city();
                    const flightNumber = faker.airline.flightNumber();

                    // Create the flight
                    const newFlight = await Flight.create({
                        departureTime: departureTime,
                        arrivalTime: arrivalTime,
                        origin: origin,
                        destination: destination,
                        flightNumber: flightNumber,
                        price: faker.number.int({ min: 100, max: 1000 }) * 1000,
                        seatCapacity: faker.number.int({ min: 100, max: 300 }),
                        availableSeats: faker.number.int({ min: 50, max: 200 }),
                        airline: faker.company.name(),
                        modelId: model.id
                    });

                    createdFlights.push(newFlight);
                } else {
                    continue;
                }
            }

            return res.status(200).json({
                message: `Auto creation of ${listModel.length} flights successful`,
                data: createdFlights
            });
        } catch (error) {
            console.error("Error AutoCreateFlights:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async AutoCreateHotels(req, res) {
        try {
            const listModel = await Model.findAll({ where: { modelTypeId: 2 } });
            const createdHotels = [];
            for (const model of listModel) {
                const existModel = await Hotel.findOne({ where: { modelId: model.id } })
                if (!existModel) {
                    const checkInDate = faker.date.future();
                    const checkOutDate = faker.date.future();
                    const amenities = faker.word.words();

                    // Create the hotel
                    const newHotel = await Hotel.create({
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        amenities: amenities,
                        pricePerNight: faker.number.int({ min: 50, max: 500 }),
                        bookingStatus: "available",
                        contactPerson: faker.person.fullName(),
                        contactEmail: faker.internet.email(),
                        modelId: model.id
                    });

                    createdHotels.push(newHotel);
                } else {
                    continue;
                }
            }

            return res.status(200).json({
                message: `Auto creation of ${listModel.length} hotels successful`,
                data: createdHotels
            });
        } catch (error) {
            console.error("Error AutoCreateHotels:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async AutoCreateCars(req, res) {
        try {
            const listModel = await Model.findAll({ where: { modelTypeId: 3 } });
            const createdBikes = [];
            for (const model of listModel) {
                const existModel = await Car.findOne({ where: { modelId: model.id } })
                if (!existModel) {
                    const typeOptions = ["Four-Wheeler", "Seven-Seater", "Two-Wheeler"];
                    const color = faker.color.rgb();
                    const sizeOptions = ["S", "M", "L"];
                    const availabilityOptions = ["available", "unavailable", "under maintenance"]

                    // Choose a random type and size
                    const randomTypeIndex = Math.floor(Math.random() * typeOptions.length);
                    const randomSizeIndex = Math.floor(Math.random() * sizeOptions.length);
                    const randomAvailabilityIndex = Math.floor(Math.random() * availabilityOptions.length);

                    // Create the bike
                    const newBike = await Car.create({
                        type: typeOptions[randomTypeIndex],
                        color: color,
                        size: sizeOptions[randomSizeIndex],
                        pricePerHour: faker.number.int({ min: 5, max: 50 }),
                        availability: availabilityOptions[randomAvailabilityIndex],
                        location: faker.location.city(),
                        modelId: model.id
                    });

                    createdBikes.push(newBike);
                } else {
                    continue;
                }
            }

            return res.status(200).json({
                message: `Auto creation of ${listModel.length} bikes successful`,
                data: createdBikes
            });
        } catch (error) {
            console.error("Error AutoCreateBikes:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async FilterHotel(req, res) {
        try {

            const { address, rate, checkInDate, checkOutDate, amenities, numberOfRooms, numberOfGuestsPerRoom, pricePerNight, bookingStatus, contactPerson, contactEmail } = req.query;

            const modelFilterOptions = {};
            if (address || rate) {
                if (address) modelFilterOptions.address = { [Op.like]: `%${address}%` }
                if (rate) modelFilterOptions.rate = { [Op.like]: `%${rate}` }
                const filteredModels = await Model.findAll({ where: modelFilterOptions });

                //check model is hotel
                const modelHotelIds = filteredModels
                    .filter(model => model.modelTypeId === 2)
                    .map(model => model.id);

                const hotelFilterOptions = { modelId: modelHotelIds };
                if (checkInDate) hotelFilterOptions.checkInDate = checkInDate;
                if (checkOutDate) hotelFilterOptions.checkOutDate = checkOutDate;
                if (amenities) hotelFilterOptions.amenities = { [Op.like]: `%${amenities}%` };
                if (numberOfRooms) hotelFilterOptions.numberOfRooms = numberOfRooms;
                if (numberOfGuestsPerRoom) hotelFilterOptions.numberOfGuestsPerRoom = numberOfGuestsPerRoom;
                if (pricePerNight) hotelFilterOptions.pricePerNight = pricePerNight;
                if (bookingStatus) hotelFilterOptions.bookingStatus = { [Op.like]: `%${bookingStatus}%` };
                if (contactPerson) hotelFilterOptions.contactPerson = { [Op.like]: `%${contactPerson}%` };
                if (contactEmail) hotelFilterOptions.contactEmail = { [Op.like]: `%${contactEmail}%` };

                // Tìm các khách sạn phù hợp với điều kiện filter
                const filteredHotels = await Hotel.findAll({
                    where: hotelFilterOptions,
                    include: {
                        model: Model,
                        attributes: ["address", "rate", "description", "nameOfModel", "numberRate"]
                    }
                });


                return res.status(200).json({
                    message: "Filtered hotels successfully",
                    data: filteredHotels
                });
            } else {
                const hotelFilterOptions = {};
                if (checkInDate) hotelFilterOptions.checkInDate = checkInDate;
                if (checkOutDate) hotelFilterOptions.checkOutDate = checkOutDate;
                if (amenities) hotelFilterOptions.amenities = { [Op.like]: `%${amenities}%` };
                if (numberOfRooms) hotelFilterOptions.numberOfRooms = numberOfRooms;
                if (numberOfGuestsPerRoom) hotelFilterOptions.numberOfGuestsPerRoom = numberOfGuestsPerRoom;
                if (pricePerNight) hotelFilterOptions.pricePerNight = pricePerNight;
                if (bookingStatus) hotelFilterOptions.bookingStatus = { [Op.like]: `%${bookingStatus}%` };
                if (contactPerson) hotelFilterOptions.contactPerson = { [Op.like]: `%${contactPerson}%` };
                if (contactEmail) hotelFilterOptions.contactEmail = { [Op.like]: `%${contactEmail}%` };
                // Tìm các khách sạn phù hợp với điều kiện filter
                const filteredHotels = await Hotel.findAll({
                    where: hotelFilterOptions,
                    include: {
                        model: Model,
                        attributes: ["address", "rate", "description", "nameOfModel", "numberRate"]
                    }
                });


                return res.status(200).json({
                    message: "Filtered hotels successfully",
                    data: filteredHotels
                });
            }


        } catch (error) {
            console.error("Error FilterHotel:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async FilterFlight(req, res) {
        try {
            const { address, rate, origin, destination, departureTime, arrivalTime, airline, price, seatCapacity, availableSeats } = req.query;
            const modelFilterOptions = {};
            if (address || rate) {
                if (address) modelFilterOptions.address = { [Op.like]: `%${address}%` }
                if (rate) modelFilterOptions.rate = { [Op.like]: `%${rate}` }
                const filteredModels = await Model.findAll({ where: modelFilterOptions });

                //check model is hotel
                const modelFlightIds = filteredModels
                    .filter(model => model.modelTypeId === 1)
                    .map(model => model.id);
                const flightFilterOptions = { modelId: modelFlightIds };
                if (origin) flightFilterOptions.origin = { [Op.like]: `%${origin}%` };
                if (destination) flightFilterOptions.destination = { [Op.like]: `%${destination}%` };
                if (departureTime) flightFilterOptions.departureTime = departureTime;
                if (arrivalTime) flightFilterOptions.arrivalTime = arrivalTime;
                if (airline) flightFilterOptions.airline = { [Op.like]: `%${airline}%` };
                if (price) flightFilterOptions.price = price;
                if (seatCapacity) flightFilterOptions.seatCapacity = seatCapacity;
                if (availableSeats) flightFilterOptions.availableSeats = availableSeats;

                const filteredFlights = await Flight.findAll({
                    where: flightFilterOptions,
                    include: {
                        model: Model,
                        attributes: ["address", "rate", "description", "nameOfModel", "numberRate"]
                    }
                });

                return res.status(200).json({
                    message: "Filtered flights successfully",
                    data: filteredFlights
                });
            } else {
                const flightFilterOptions = {};
                if (origin) flightFilterOptions.origin = { [Op.like]: `%${origin}%` };
                if (destination) flightFilterOptions.destination = { [Op.like]: `%${destination}%` };
                if (departureTime) flightFilterOptions.departureTime = departureTime;
                if (arrivalTime) flightFilterOptions.arrivalTime = arrivalTime;
                if (airline) flightFilterOptions.airline = { [Op.like]: `%${airline}%` };
                if (price) flightFilterOptions.price = price;
                if (seatCapacity) flightFilterOptions.seatCapacity = seatCapacity;
                if (availableSeats) flightFilterOptions.availableSeats = availableSeats;

                const filteredFlights = await Flight.findAll({
                    where: flightFilterOptions,
                    include: {
                        model: Model,
                        attributes: ["address", "rate", "description", "nameOfModel", "numberRate"]
                    }
                });

                return res.status(200).json({
                    message: "Filtered flights successfully",
                    data: filteredFlights
                });
            }
        } catch (error) {
            console.error("Error FilterFlight:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async FilterCar(req, res) {
        try {
            const { address, rate, type, color, size, pricePerHour, availability, location } = req.query;
            const modelFilterOptions = {}
            if (address || rate) {
                if (address) modelFilterOptions.address = { [Op.like]: `%${address}%` }
                if (rate) modelFilterOptions.rate = { [Op.like]: `%${rate}` }
                const filteredModels = await Model.findAll({ where: modelFilterOptions });

                //check model is hotel
                const modelCarIds = filteredModels
                    .filter(model => model.modelTypeId === 3)
                    .map(model => model.id);
                const carFilterOptions = { modelId: modelCarIds };
                if (type) carFilterOptions.type = { [Op.like]: `%${type}%` };
                if (color) carFilterOptions.color = { [Op.like]: `%${color}%` };
                if (size) carFilterOptions.size = { [Op.like]: `%${size}%` };
                if (pricePerHour) carFilterOptions.pricePerHour = pricePerHour;
                if (availability) carFilterOptions.availability = { [Op.like]: `%${availability}%` };
                if (location) carFilterOptions.location = { [Op.like]: `%${location}%` };

                const filteredCars = await Car.findAll({
                    where: carFilterOptions,
                    include: {
                        model: Model,
                        attributes: ["address", "rate", "description", "nameOfModel", "numberRate"]
                    }
                });

                return res.status(200).json({
                    message: "Filtered cars successfully",
                    data: filteredCars
                });
            }

            const carFilterOptions = {};
            if (type) carFilterOptions.type = { [Op.like]: `%${type}%` };
            if (color) carFilterOptions.color = { [Op.like]: `%${color}%` };
            if (size) carFilterOptions.size = { [Op.like]: `%${size}%` };
            if (pricePerHour) carFilterOptions.pricePerHour = pricePerHour;
            if (availability) carFilterOptions.availability = { [Op.like]: `%${availability}%` };
            if (location) carFilterOptions.location = { [Op.like]: `%${location}%` };

            const filteredCars = await Car.findAll({
                where: carFilterOptions,
                include: {
                    model: Model,
                    attributes: ["address", "rate", "description", "nameOfModel", "numberRate"]
                }
            });

            return res.status(200).json({
                message: "Filtered cars successfully",
                data: filteredCars
            });
        } catch (error) {
            console.error("Error FilterCar:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async GetNearbyModels(req, res) {
        const { latitude, longitude, distance, rate } = req.body;
        try {
            const models = await Model.findAll({
                where: {
                    [Op.and]: [
                        literal(`
                            ST_Distance(
                                ST_GeomFromText('POINT(${longitude} ${latitude})', 4326), 
                                "model"."address_location"
                            ) < ${distance}
                        `),
                        // {
                        //     rate: {
                        //         [Op.gte]: rate ? rate : 3 // Chỉ lấy các model có rate lớn hơn hoặc bằng giá trị rate được cung cấp
                        //     }
                        // }
                    ]
                },
            });
            return res.status(200).json({
                success: true,
                data: models
            });
        } catch (error) {
            console.error("Error in getNearbyModelsOne:", error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }

    static async CalculateDistanceKilometers(req, res) {
        const { lon1, lat1, lon2, lat2 } = req.body;
        const earthRadiusKilometers = 6371; // Bán kính trái đất trong kilômét

        // Chuyển đổi độ sang radian
        const degreesToRadians = (degrees) => {
            return degrees * Math.PI / 180;
        };

        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceMeters = earthRadiusKilometers * c * 1000; // Chuyển đổi sang mét
        const distanceKilometers = distanceMeters / 1000; // Chuyển đổi sang kilômét
        return res.status(200).json({
            distance: distanceKilometers + " km"
        });
    }


}
exports.ModelController = ModelController