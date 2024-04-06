const { faker } = require('@faker-js/faker');
const { Op, where } = require("sequelize");
const cloundinary = require('../utils/cloudinary')
const db = require('../model/index')
const provinces = require('../database/dataProvincesJson')
const desType = require("../database/dataDesTypeJson")
const geolib = require('geolib');
const turf = require('@turf/turf');
const axios = require('axios')

const Model = db.model
const ModelType = db.modelType
const ModelImages = db.model_images
const Hotel = db.hotel
const Flight = db.flight
const Car = db.car
const Destination = db.destination
const CookieDes = db.des_cookie
const CookieDestination = db.cookie_destination
const DestinationType = db.destinationType
const DestinationImages = db.destinationImages
const Cookie = db.cookie
const CookieModel = db.cookie_model
const RangeModel = db.range_model
const RangeModelDetail = db.range_model_detail
const Range = db.range
const Bookings = db.booking

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
            return res.status(200).json({
                success: true,
                message: "Model types created successfully!"
            });
        } catch (error) {
            console.error("Error creating type:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async AutoCreateDestinationType(req, res) {
        try {
            const listType = desType.Type

            for (const item of listType) {
                await DestinationType.create({
                    typeName: item.name,
                });
            }
            return res.status(200).json({
                success: true,
                message: "Destination types created successfully!"
            });
        } catch (error) {
            console.error("Error creating type:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetModelById(req, res) {
        try {
            const modelId = req.params.id;
            if (!modelId) {
                return res.status(400).json({
                    success: false,
                    message: "ModelId is required"
                });
            } else {
                const images = await ModelImages.findAll({
                    where: {
                        modelId: modelId
                    },
                    attributes: ["url", "publicId", "id"],
                });

                const result = await Model.findByPk(modelId, {
                    attributes: ["description", "address", "nameOfModel", "rate", "numberRate"],
                    include: {
                        model: ModelType,
                        attributes: ['typeName']
                    }
                });

                if (result) {
                    const data = {
                        description: result.description,
                        address: result.address,
                        nameOfModel: result.nameOfModel,
                        rate: result.rate,
                        numberRate: result.numberRate,
                        typeName: result.modelType.typeName,
                        images: images
                    };

                    return res.status(200).json({
                        success: true,
                        message: `Data of Model with Id ${modelId}`,
                        data: data
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Data of Model with Id ${modelId} not found`,
                    });
                }
            }
        } catch (error) {
            console.error("Error GetModelById:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
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
                success: true,
                message: "Create model successfully",
                data: result
            });
        } catch (error) {
            console.error("Error CreateModel:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async CreateBookMark(req, res) {
        try {
            const { modelId, userId } = req.body;

            const model = await Model.findByPk(modelId);

            if (!model) {
                return res.status(404).json({
                    success: false,
                    message: "Model not found"
                });
            }

            let cookie = await Cookie.findOne({
                where: {
                    name: model.name.trim()
                }
            });

            if (!cookie) {
                [cookie] = await Cookie.findOrCreate({
                    where: {
                        name: model.name.trim()
                    }
                });
            }

            const existingBookmark = await CookieModel.findOne({
                where: {
                    modelId: modelId,
                    cookieId: cookie.id,
                    userId: userId
                }
            });

            if (!existingBookmark) {
                await CookieModel.create({
                    modelId: modelId,
                    cookieId: cookie.id,
                    userId: userId
                });
            } else {
                await existingBookmark.update({
                    updatedAt: new Date()
                });
            }

            return res.status(200).json({
                success: true,
                message: "Bookmark added successfully"
            });

        } catch (error) {
            console.error("Error CreateBookMark:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async CreateBookMarkDestination(req, res) {
        try {
            const { destinationId, userId } = req.body;

            const destination = await Destination.findByPk(destinationId);

            if (!destination) {
                return res.status(404).json({
                    success: false,
                    message: "Destination not found"
                });
            }

            let cookie = await CookieDes.findOne({
                where: {
                    name: destination.name.trim()
                }
            });

            if (!cookie) {
                [cookie] = await CookieDes.findOrCreate({
                    where: {
                        name: destination.name.trim()
                    }
                });
            }

            const existingBookmark = await CookieDestination.findOne({
                where: {
                    destinationId: destinationId,
                    desCookieId: cookie.id,
                    userId: userId
                }
            });

            if (!existingBookmark) {
                await CookieDestination.create({
                    destinationId: destinationId,
                    desCookieId: cookie.id,
                    userId: userId
                });
            } else {
                await existingBookmark.update({
                    updatedAt: new Date()
                });
            }

            return res.status(200).json({
                success: true,
                message: "Bookmark added successfully"
            });

        } catch (error) {
            console.error("Error CreateBookMarkDestination:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }


    static async GetListBookMarkOfUserId(req, res) {

    }

    static async UpdateModel(req, res) {
        try {
            const modelId = req.params.id;
            const { description, address, rate, idImg } = req.body;

            const idImgs = idImg.split(',').map(Number);

            const model = await Model.findByPk(modelId);

            if (!model) {
                return res.status(404).json({
                    success: false,
                    message: "Model not found"
                });
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
                const currentTotalRate = (model.rate || 0) * (model.numberRate || 0);
                const newTotalRate = currentTotalRate + rate;
                const newNumberRate = (model.numberRate || 0) + 1;
                const newAverageRate = newTotalRate / newNumberRate;

                // Làm tròn trung bình rate đến một số chữ số thập phân cụ thể
                const roundedRate = Number(newAverageRate.toFixed(1));

                model.rate = roundedRate;
                model.numberRate = newNumberRate;
            }

            // Save the updated model
            await model.save();

            // Return success response
            return res.status(200).json({
                success: true,
                message: "Model updated successfully",
                data: model
            });
        } catch (error) {
            console.error("Error UpdateModel:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async DeleteModel(req, res) {
        try {
            const modelId = req.params.id;

            const model = await Model.findByPk(modelId);

            if (!model) {
                return res.status(404).json({
                    success: false,
                    message: "Model not found"
                });
            }

            await model.destroy();

            return res.status(200).json({
                success: true,
                message: "Model deleted successfully"
            });
        } catch (error) {
            console.error("Error DeleteModel:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetAllModels(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 12;
            const offset = (page - 1) * limit;

            const models = await Model.findAndCountAll({
                attributes: ["id", "description", "address", "name", "rate", "numberRate", "address_location"],
                include: [
                    {
                        model: ModelImages,
                        attributes: ['url'],
                    },
                    {
                        model: ModelType,
                        attributes: ['typeName']
                    }
                ],
                limit: limit,
                offset: offset,
                order: [['id', 'ASC']],
                distinct: true
            });

            const totalCount = models.count;
            const totalPages = Math.ceil(totalCount / limit);

            const formattedModels = models.rows.map(model => {
                const urls = model.model_images.map(image => image.url);
                return {
                    id: model.id,
                    description: model.description,
                    address: model.address,
                    name: model.name,
                    rate: model.rate,
                    numberRate: model.numberRate,
                    address_location: model.address_location,
                    urls: urls,
                    typeName: model.modelType.typeName
                };
            });

            return res.status(200).json({
                success: true,
                message: "Models retrieved successfully",
                data: formattedModels,
                totalCount: totalCount,
                totalPages: totalPages
            });
        } catch (error) {
            console.error("Error in GetAllModels:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetAllDestination(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 12;
            const offset = (page - 1) * limit;

            const destinations = await Destination.findAndCountAll({
                attributes: ["id", "description", "address", "name", "rate", "numberRate", "address_location"],
                include: [
                    {
                        model: DestinationImages,
                        attributes: ['url'],
                    },
                    {
                        model: DestinationType,
                        attributes: ['typeName']
                    }
                ],
                limit: limit,
                offset: offset,
                order: [['id', 'ASC']],
                distinct: true
            });

            const totalCount = destinations.count;
            const totalPages = Math.ceil(totalCount / limit);

            const formattedDestinations = destinations.rows.map(destination => {
                const urls = destination.destination_images.map(image => image.url);
                return {
                    id: destination.id,
                    description: destination.description,
                    address: destination.address,
                    name: destination.name,
                    rate: destination.rate,
                    numberRate: destination.numberRate,
                    address_location: destination.address_location,
                    urls: urls,
                    typeName: destination.destinationType.typeName
                };
            });

            return res.status(200).json({
                success: true,
                message: "Destinations retrieved successfully",
                data: formattedDestinations,
                totalCount: totalCount,
                totalPages: totalPages
            });
        } catch (error) {
            console.error("Error in GetAllDestination:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async AutoCreateDestination(req, res) {
        try {
            const creationPromises = provinces?.provinces?.map(async (model) => {
                const description = faker.lorem.sentence();
                const address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`;
                const name = model.name;
                const latitude = parseFloat(model.lat);
                const longitude = parseFloat(model.lon);
                const iso2 = model.iso2 ? model.iso2 : '';

                const newModel = await Destination.create({
                    description: description,
                    address: address,
                    name: name,
                    iso2: iso2,
                    latitude: latitude,
                    longitude: longitude,
                    destinationTypeId: faker.number.int({ min: 1, max: 15 }),
                    rate: Math.floor(faker.number.float({ min: 10, max: 50 }) / 10),
                    numberRate: faker.number.int({ min: 5, max: 10 }),
                    address_location: `${longitude},${latitude}`
                });

                for (let i = 0; i < 3; i++) {
                    const imageUrl = faker.image.url();
                    const result = await cloundinary.uploader.upload(imageUrl, {
                        upload_preset: 'vnldjdbe',
                        public_id: `unique_id_${Date.now()}`
                    });

                    const createdImage = await DestinationImages.create({
                        url: result.secure_url,
                        publicId: result.public_id,
                        destinationId: newModel.id
                    });
                }

                return newModel;
            });

            const createdModels = await Promise.all(creationPromises);

            return res.status(200).json({
                success: true,
                message: "Auto create successful",
                data: createdModels
            });
        } catch (error) {
            console.error("Error AutoCreate:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async AutoCreateModel(req, res) {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
            const listModel = response.data.data.slice(0, 60);
            ;

            const creationPromises = listModel.map(async (model) => {
                const description = faker.lorem.sentence();
                const address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`;
                const name = model.name;
                const latitude = parseFloat(model.lat);
                const longitude = parseFloat(model.long);
                const iso2 = model.iso2;

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
                    address_location: `${longitude},${latitude}`
                });

                for (let i = 0; i < 3; i++) {
                    const imageUrl = faker.image.url()
                    const result = await cloundinary.uploader.upload(imageUrl, {
                        upload_preset: 'vnldjdbe',
                        public_id: `unique_id_${Date.now()}`
                    });

                    const createdImage = await ModelImages.create({
                        url: result.secure_url,
                        publicId: result.public_id,
                        modelId: newModel.id
                    });
                }

                return newModel;
            });

            const createdModels = await Promise.all(creationPromises);

            return res.status(200).json({
                success: true,
                message: "Auto create successful",
                data: createdModels
            });
        } catch (error) {
            console.error("Error AutoCreate:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async AutoCreateFlights(req, res) {
        try {
            const listModel = await Model.findAll({ where: { modelTypeId: 1 } });
            const createdFlights = [];
            for (const model of listModel) {
                const existModel = await Flight.findOne({ where: { modelId: model.id } })
                if (existModel == null) {
                    // const departureTime = faker.date.future();
                    // const arrivalTime = faker.date.future();
                    const origin = faker.location.city();
                    const destination = faker.location.city();
                    const flightNumber = faker.airline.flightNumber();

                    // Create the flight
                    const newFlight = await Flight.create({
                        // departureTime: departureTime,
                        // arrivalTime: arrivalTime,
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
                success: true,
                message: `Auto creation of ${listModel.length} flights successful`,
                data: createdFlights
            });
        } catch (error) {
            console.error("Error AutoCreateFlights:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async AutoCreateHotels(req, res) {
        try {
            const listModel = await Model.findAll({ where: { modelTypeId: 2 } });
            const createdHotels = [];
            for (const model of listModel) {
                const existModel = await Hotel.findOne({ where: { modelId: model.id } })
                if (!existModel) {
                    // const checkInDate = faker.date.future();
                    // const checkOutDate = faker.date.future();
                    const amenities = faker.word.words();

                    // Create the hotel
                    const newHotel = await Hotel.create({
                        // checkInDate: checkInDate,
                        // checkOutDate: checkOutDate,
                        numberOfRooms: faker.number.int({ min: 1, max: 20 }),
                        numberOfGuestsPerRoom: faker.number.int({ min: 1, max: 20 }),
                        amenities: amenities,
                        pricePerNight: faker.number.int({ min: 50, max: 500 }),
                        status: "Active",
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
                success: true,
                message: `Auto creation of ${listModel.length} hotels successful`,
                data: createdHotels
            });
        } catch (error) {
            console.error("Error AutoCreateHotels:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
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
                success: true,
                message: `Auto creation of ${listModel.length} bikes successful`,
                data: createdBikes
            });
        } catch (error) {
            console.error("Error AutoCreateBikes:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async FilterHotel(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const perPage = 12;
            const offset = (page - 1) * perPage;

            const { address, rate = 1, checkInDate, checkOutDate, amenities, numberOfRooms, numberOfAdult, numberOfChildren, pricePerNight, bookingStatus, contactPerson, contactEmail, orderByRate = 'true', orderByPrice } = req.query;

            const modelFilterOptions = {};
            const bookingFilterOptions = {};
            const numberOfGuestsPerRoom = Math.ceil(parseInt(numberOfAdult) + parseInt(numberOfChildren) / 2);

            if (address || rate) {
                if (address) modelFilterOptions.address = { [Op.like]: `%${address}%` };
                if (rate) {
                    if (orderByRate === 'true') {
                        modelFilterOptions.rate = { [Op.gte]: rate };
                    } else if (orderByRate === 'false') {
                        modelFilterOptions.rate = { [Op.lte]: rate };
                    } else {
                        modelFilterOptions.rate = rate;
                    }
                }
                const filteredModels = await Model.findAll({ where: modelFilterOptions });

                const modelHotelIds = filteredModels
                    .filter(model => model.modelTypeId === 2)
                    .map(model => model.id);

                const hotelFilterOptions = { modelId: modelHotelIds };

                if (pricePerNight) {
                    if (orderByPrice === 'true') {
                        hotelFilterOptions.pricePerNight = { [Op.gte]: pricePerNight };
                    } else if (orderByPrice === 'false') {
                        hotelFilterOptions.pricePerNight = { [Op.lte]: pricePerNight };
                    } else {
                        hotelFilterOptions.pricePerNight = pricePerNight;
                    }
                }

                if (amenities) hotelFilterOptions.amenities = { [Op.like]: `%${amenities}%` };
                if (numberOfRooms) hotelFilterOptions.numberOfRooms = numberOfRooms;
                if (numberOfGuestsPerRoom) hotelFilterOptions.numberOfGuestsPerRoom = numberOfGuestsPerRoom;
                if (bookingStatus) hotelFilterOptions.bookingStatus = { [Op.like]: `%${bookingStatus}%` };
                if (contactPerson) hotelFilterOptions.contactPerson = { [Op.like]: `%${contactPerson}%` };
                if (contactEmail) hotelFilterOptions.contactEmail = { [Op.like]: `%${contactEmail}%` };

                if (checkInDate && checkOutDate) {
                    console.log(11111111111111111111)
                    if (new Date(checkInDate) >= new Date(checkOutDate)) {
                        return res.status(400).json({ success: false, message: "Invalid date range: Check-in date must be before check-out date" });
                    }
                    bookingFilterOptions.statusBooking = { [Op.notIn]: ["Pending", "Confirmed"] };
                    bookingFilterOptions.startDate = { [Op.gte]: checkInDate };
                    bookingFilterOptions.expireDate = { [Op.lte]: checkOutDate };

                    const filteredHotels = await Hotel.findAndCountAll({
                        where: hotelFilterOptions,
                        include: [
                            {
                                model: Model,
                                attributes: ["address", "rate", "description", "numberRate", "id", "name", "status", "address_location"],
                                include: [
                                    {
                                        model: ModelImages,
                                        attributes: ['url'],
                                    },
                                    {
                                        model: ModelType,
                                        attributes: ['typeName'],
                                    },
                                    {
                                        model: RangeModel,
                                        include: {
                                            model: RangeModelDetail,
                                            include: [
                                                {
                                                    model: Bookings,
                                                    where: bookingFilterOptions
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ],
                        order: [['id', 'ASC']],
                        distinct: true
                    });

                    const formattedModels = filteredHotels.rows.map(model => {
                        const hasRangeModelDetails = model.model && model.model.range_models && model.model.range_models.some(
                            range => range.range_model_details && range.range_model_details.length > 0
                        );

                        if (hasRangeModelDetails && hotelFilterOptions) {
                            const urls = model.dataValues.model.dataValues.model_images.map(image => image.url);
                            return {
                                checkInDate: model.dataValues.checkInDate,
                                checkOutDate: model.dataValues.checkOutDate,
                                amenities: model.dataValues.amenities,
                                numberOfRooms: model.dataValues.numberOfRooms,
                                numberOfGuestsPerRoom: model.dataValues.numberOfGuestsPerRoom,
                                pricePerNight: model.dataValues.pricePerNight,
                                bookingStatus: model.dataValues.bookingStatus,
                                contactPerson: model.dataValues.contactPerson,
                                contactEmail: model.dataValues.contactEmail,
                                model: {
                                    id: model.dataValues.model.dataValues.id,
                                    description: model.dataValues.model.dataValues.description,
                                    address: model.dataValues.model.dataValues.address,
                                    name: model.dataValues.model.dataValues.name,
                                    latitude: model.dataValues.model.dataValues.latitude,
                                    longitude: model.dataValues.model.dataValues.longitude,
                                    status: model.dataValues.model.dataValues.status,
                                    rate: model.dataValues.model.dataValues.rate,
                                    numberRate: model.dataValues.model.dataValues.numberRate,
                                    iso2: model.dataValues.model.dataValues.iso2,
                                    address_location: model.dataValues.model.dataValues.address_location,
                                    urls: urls,
                                    typeName: model.dataValues.model.dataValues.modelType.typeName,
                                }
                            };
                        } else {
                            return null;
                        }
                    });

                    const filteredFormattedModels = formattedModels.filter(model => model !== null);

                    const totalCount = filteredFormattedModels.length;
                    const totalPages = Math.ceil(totalCount / perPage);
                    const currentPageData = filteredFormattedModels.slice(offset, offset + perPage);

                    return res.status(200).json({
                        success: true,
                        message: "Filtered hotels successfully",
                        totalCount,
                        totalPages,
                        data: currentPageData,
                    });
                } else {
                    console.log(2222222222222222)
                    const filteredHotels = await Hotel.findAndCountAll({
                        where: hotelFilterOptions,
                        include: [
                            {
                                model: Model,
                                attributes: ["address", "rate", "description", "numberRate", "id", "name", "status", "address_location"],
                                include: [
                                    {
                                        model: ModelImages,
                                        attributes: ['url'],
                                    },
                                    {
                                        model: ModelType,
                                        attributes: ['typeName'],
                                    },
                                    {
                                        model: RangeModel,
                                        include: {
                                            model: RangeModelDetail,
                                        }
                                    }
                                ]
                            }
                        ],
                        order: [['id', 'ASC']],
                        distinct: true
                    });

                    const formattedModels = filteredHotels.rows.map(model => {
                        if (hotelFilterOptions) {
                            const urls = model.dataValues.model.dataValues.model_images.map(image => image.url);
                            return {
                                checkInDate: model.dataValues.checkInDate,
                                checkOutDate: model.dataValues.checkOutDate,
                                amenities: model.dataValues.amenities,
                                numberOfRooms: model.dataValues.numberOfRooms,
                                numberOfGuestsPerRoom: model.dataValues.numberOfGuestsPerRoom,
                                pricePerNight: model.dataValues.pricePerNight,
                                bookingStatus: model.dataValues.bookingStatus,
                                contactPerson: model.dataValues.contactPerson,
                                contactEmail: model.dataValues.contactEmail,
                                model: {
                                    id: model.dataValues.model.dataValues.id,
                                    description: model.dataValues.model.dataValues.description,
                                    address: model.dataValues.model.dataValues.address,
                                    name: model.dataValues.model.dataValues.name,
                                    latitude: model.dataValues.model.dataValues.latitude,
                                    longitude: model.dataValues.model.dataValues.longitude,
                                    status: model.dataValues.model.dataValues.status,
                                    rate: model.dataValues.model.dataValues.rate,
                                    numberRate: model.dataValues.model.dataValues.numberRate,
                                    iso2: model.dataValues.model.dataValues.iso2,
                                    address_location: model.dataValues.model.dataValues.address_location,
                                    urls: urls,
                                    typeName: model.dataValues.model.dataValues.modelType.typeName,
                                }
                            };
                        } else {
                            return null;
                        }
                    });

                    const filteredFormattedModels = formattedModels.filter(model => model !== null);

                    const totalCount = filteredFormattedModels.length;
                    const totalPages = Math.ceil(totalCount / perPage);
                    const currentPageData = filteredFormattedModels.slice(offset, offset + perPage);

                    return res.status(200).json({
                        success: true,
                        message: "Filtered hotels successfully",
                        totalCount,
                        totalPages,
                        data: currentPageData,
                    });
                }

            }
        } catch (error) {
            console.error("Error FilterHotel:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }


    static async FilterFlight(req, res) {
        try {

            const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
            const perPage = 12; // Number of users to show per page
            const offset = (page - 1) * perPage; // Calculate the offset based on the page

            const { address, rate = 1, origin, checkInDate, checkOutDate, destination, departureTime, arrivalTime, airline, price, seatCapacity, availableSeats, orderByRate = 'true', orderByPrice } = req.query;

            const modelFilterOptions = {};
            const bookingFilterOptions = {};
            if (address || rate) {
                if (address) modelFilterOptions.address = { [Op.like]: `%${address}%` };
                if (rate) {
                    if (orderByRate === 'true') {
                        modelFilterOptions.rate = { [Op.gte]: rate };
                    } else if (orderByRate === 'false') {
                        modelFilterOptions.rate = { [Op.lte]: rate };
                    } else {
                        modelFilterOptions.rate = rate;
                    }
                }
                const filteredModels = await Model.findAll({ where: modelFilterOptions });

                //check model is hotel
                const modelFlightIds = filteredModels
                    .filter(model => model.modelTypeId === 1)
                    .map(model => model.id);
                const flightFilterOptions = { modelId: modelFlightIds };
                if (checkInDate && checkOutDate) {
                    if (new Date(checkInDate) >= new Date(checkOutDate)) {
                        return res.status(400).json({ success: false, message: "Invalid date range: Check-in date must be before check-out date" });
                    }
                    bookingFilterOptions.statusBooking = { [Op.notIn]: ["Pending", "Confirmed"] };
                    bookingFilterOptions.startDate = { [Op.gte]: checkInDate };
                    bookingFilterOptions.expireDate = { [Op.lte]: checkOutDate };
                }
                if (origin) flightFilterOptions.origin = { [Op.like]: `%${origin}%` };
                if (destination) flightFilterOptions.destination = { [Op.like]: `%${destination}%` };
                if (departureTime) flightFilterOptions.departureTime = departureTime;
                if (arrivalTime) flightFilterOptions.arrivalTime = arrivalTime;
                if (airline) flightFilterOptions.airline = { [Op.like]: `%${airline}%` };
                if (price) {
                    if (orderByPrice === 'true') {
                        flightFilterOptions.price = { [Op.gte]: price };
                    } else if (orderByPrice === 'false') {
                        flightFilterOptions.price = { [Op.lte]: price };
                    } else {
                        flightFilterOptions.price = price;
                    }
                }
                if (seatCapacity) flightFilterOptions.seatCapacity = seatCapacity;
                if (availableSeats) flightFilterOptions.availableSeats = availableSeats;

                const filteredFlights = await Flight.findAndCountAll({
                    where: flightFilterOptions,
                    include: [
                        {
                            model: Model,
                            attributes: ["address", "rate", "description", "numberRate", "id", "name", "status", "address_location"],
                            include: [
                                {
                                    model: ModelImages,
                                    attributes: ['url'],
                                },
                                {
                                    model: ModelType,
                                    attributes: ['typeName'],
                                },
                                {
                                    model: RangeModel,
                                    include: {
                                        model: RangeModelDetail,
                                        include: [
                                            {
                                                model: Bookings,
                                                where: bookingFilterOptions
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    order: [['id', 'ASC']],
                    distinct: true
                });

                const formattedModels = filteredFlights.rows.map(model => {
                    const hasRangeModelDetails = model.dataValues.model.dataValues.range_models.some(range => range.dataValues.range_model_details.length > 0);
                    if (hasRangeModelDetails && flightFilterOptions) {
                        const urls = model.dataValues.model.dataValues.model_images.map(image => image.url);
                        return {
                            departureTime: model.dataValues.departureTime,
                            arrivalTime: model.dataValues.arrivalTime,
                            origin: model.dataValues.origin,
                            destination: model.dataValues.destination,
                            flightNumber: model.dataValues.flightNumber,
                            price: model.dataValues.price,
                            seatCapacity: model.dataValues.seatCapacity,
                            availableSeats: model.dataValues.availableSeats,
                            airline: model.dataValues.airline,
                            model: {
                                id: model.dataValues.model.dataValues.id,
                                description: model.dataValues.model.dataValues.description,
                                address: model.dataValues.model.dataValues.address,
                                name: model.dataValues.model.dataValues.name,
                                latitude: model.dataValues.model.dataValues.latitude,
                                longitude: model.dataValues.model.dataValues.longitude,
                                status: model.dataValues.model.dataValues.status,
                                rate: model.dataValues.model.dataValues.rate,
                                numberRate: model.dataValues.model.dataValues.numberRate,
                                iso2: model.dataValues.model.dataValues.iso2,
                                address_location: model.dataValues.model.dataValues.address_location,
                                urls: urls,
                                typeName: model.dataValues.model.dataValues.modelType.typeName,
                            },
                        };
                    }
                });

                const filteredFormattedModels = formattedModels.filter(model => model !== null);

                const totalCount = filteredFormattedModels.length;
                const totalPages = Math.ceil(totalCount / perPage);
                const currentPageData = filteredFormattedModels.slice(offset, offset + perPage);

                return res.status(200).json({
                    success: true,
                    message: "Filtered flights successfully",
                    totalCount,
                    totalPages,
                    data: currentPageData
                });
            }
        } catch (error) {
            console.error("Error FilterFlight:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async FilterCar(req, res) {
        try {

            const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
            const perPage = 12; // Number of users to show per page
            const offset = (page - 1) * perPage; // Calculate the offset based on the page
            const { address, rate = 1, checkInDate, checkOutDate, type, color, size, pricePerHour, availability, location, orderByRate = 'true', orderByPrice } = req.query;
            const modelFilterOptions = {}
            const bookingFilterOptions = {};
            if (address || rate) {
                if (address) modelFilterOptions.address = { [Op.like]: `%${address}%` };
                if (rate) {
                    if (orderByRate === 'true') {
                        modelFilterOptions.rate = { [Op.gte]: rate };
                    } else if (orderByRate === 'false') {
                        modelFilterOptions.rate = { [Op.lte]: rate };
                    } else {
                        modelFilterOptions.rate = rate;
                    }
                }
                const filteredModels = await Model.findAll({ where: modelFilterOptions });

                //check model is hotel
                const modelCarIds = filteredModels
                    .filter(model => model.modelTypeId === 3)
                    .map(model => model.id);
                const carFilterOptions = { modelId: modelCarIds };
                if (checkInDate && checkOutDate) {
                    if (new Date(checkInDate) >= new Date(checkOutDate)) {
                        return res.status(400).json({ success: false, message: "Invalid date range: Check-in date must be before check-out date" });
                    }
                    bookingFilterOptions.statusBooking = { [Op.notIn]: ["Pending", "Confirmed"] };
                    bookingFilterOptions.startDate = { [Op.gte]: checkInDate };
                    bookingFilterOptions.expireDate = { [Op.lte]: checkOutDate };
                }
                if (type) carFilterOptions.type = { [Op.like]: `%${type}%` };
                if (color) carFilterOptions.color = { [Op.like]: `%${color}%` };
                if (size) carFilterOptions.size = { [Op.like]: `%${size}%` };
                if (pricePerHour) {
                    if (orderByPrice === 'true') {
                        carFilterOptions.pricePerHour = { [Op.gte]: pricePerHour };
                    } else if (orderByPrice === 'false') {
                        carFilterOptions.pricePerHour = { [Op.lte]: pricePerHour };
                    } else {
                        carFilterOptions.pricePerHour = pricePerHour;
                    }
                }
                if (availability) carFilterOptions.availability = { [Op.like]: `%${availability}%` };
                if (location) carFilterOptions.location = { [Op.like]: `%${location}%` };

                const filteredCars = await Car.findAndCountAll({
                    where: carFilterOptions,
                    include: [
                        {
                            model: Model,
                            attributes: ["address", "rate", "description", "numberRate", "id", "name", "status", "address_location"],
                            include: [
                                {
                                    model: ModelImages,
                                    attributes: ['url'],
                                },
                                {
                                    model: ModelType,
                                    attributes: ['typeName'],
                                },
                                {
                                    model: RangeModel,
                                    include: {
                                        model: RangeModelDetail,
                                        include: [
                                            {
                                                model: Bookings,
                                                where: bookingFilterOptions
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    order: [['id', 'ASC']],
                    distinct: true
                });

                const formattedModels = filteredCars.rows.map(model => {
                    const hasRangeModelDetails = model.dataValues.model.dataValues.range_models.some(range => range.dataValues.range_model_details.length > 0);
                    if (hasRangeModelDetails && carFilterOptions) {
                        const urls = model.dataValues.model.dataValues.model_images.map(image => image.url);
                        return {
                            type: model.dataValues.type,
                            color: model.dataValues.color,
                            size: model.dataValues.size,
                            pricePerHour: model.dataValues.pricePerHour,
                            availability: model.dataValues.availability,
                            location: model.dataValues.location,
                            model: {
                                id: model.dataValues.model.dataValues.id,
                                description: model.dataValues.model.dataValues.description,
                                address: model.dataValues.model.dataValues.address,
                                name: model.dataValues.model.dataValues.name,
                                latitude: model.dataValues.model.dataValues.latitude,
                                longitude: model.dataValues.model.dataValues.longitude,
                                status: model.dataValues.model.dataValues.status,
                                rate: model.dataValues.model.dataValues.rate,
                                numberRate: model.dataValues.model.dataValues.numberRate,
                                iso2: model.dataValues.model.dataValues.iso2,
                                address_location: model.dataValues.model.dataValues.address_location,
                                urls: urls,
                                typeName: model.dataValues.model.dataValues.modelType.typeName,
                            },
                        };
                    }
                });

                const filteredFormattedModels = formattedModels.filter(model => model !== null);

                const totalCount = filteredFormattedModels.length;
                const totalPages = Math.ceil(totalCount / perPage);
                const currentPageData = filteredFormattedModels.slice(offset, offset + perPage);

                return res.status(200).json({
                    success: true,
                    message: "Filtered cars successfully",
                    totalCount,
                    totalPages,
                    data: currentPageData
                });
            }

        } catch (error) {
            console.error("Error FilterCar:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async FilterDestination(req, res) {
        try {

            const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
            const perPage = 12; // Number of users to show per page
            const offset = (page - 1) * perPage; // Calculate the offset based on the page
            const { address, rate, description, name, status, nameType } = req.query;

            const destinationFilterOptions = {};
            if (address) destinationFilterOptions.address = { [Op.like]: `%${address}%` };
            if (rate) destinationFilterOptions.rate = { [Op.gte]: rate };
            if (description) destinationFilterOptions.description = { [Op.like]: `%${description}%` };
            if (name) destinationFilterOptions.name = { [Op.like]: `%${name}%` };
            if (status) destinationFilterOptions.status = status;
            if (nameType) {
                const destinationType = await DestinationType.findOne({
                    where: { typeName: { [Op.like]: `%${nameType}%` } }
                })
                destinationFilterOptions.destinationTypeId = destinationType.dataValues.id
            }

            const filteredDestinations = await Destination.findAndCountAll({
                where: destinationFilterOptions,
                include: [
                    {
                        model: DestinationImages,
                        attributes: ['url'],
                    },
                    {
                        model: DestinationType,
                        attributes: ['typeName'],
                    }
                ],
                limit: perPage,
                offset: offset,
                order: [['id', 'ASC']],
                distinct: true
            });

            const totalCount = filteredDestinations.count;
            const totalPages = Math.ceil(totalCount / perPage);

            const formattedDestinations = filteredDestinations.rows.map(destination => {
                let urls = [];
                if (destination.destination_images) {
                    urls = destination.destination_images.map(image => image.url);
                }
                return {
                    id: destination.id,
                    description: destination.description,
                    name: destination.name,
                    address: destination.address,
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                    status: destination.status,
                    rate: destination.rate,
                    numberRate: destination.numberRate,
                    urls: urls,
                    typeName: destination.destinationType.dataValues.typeName,
                };
            });

            return res.status(200).json({
                success: true,
                message: "Filtered destinations successfully",
                totalCount,
                totalPages,
                data: formattedDestinations
            });
        } catch (error) {
            console.error("Error FilterDestination:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetNearbyModels(req, res) {
        try {
            const { address, distance = 50, rate } = req.query;

            const modelFind = await Model.findOne({
                where: { address: address },
                attributes: ['latitude', 'longitude']
            });

            if (!modelFind) {
                return res.status(404).json({
                    success: false,
                    message: "Model not found with the provided address."
                });
            }

            const { longitude, latitude } = modelFind.dataValues;

            const modelPoint = turf.point([longitude, latitude]);

            const models = await Model.findAll({
                include: [
                    {
                        model: ModelImages,
                        attributes: ['url'],
                    },
                    {
                        model: ModelType,
                        attributes: ['typeName'],
                    }
                ],
            });

            const nearbyModels = models.filter(model => {
                if (model.longitude !== longitude || model.latitude !== latitude) {
                    const distanceInKilometers = turf.distance(modelPoint, turf.point([model.longitude, model.latitude]), { units: 'kilometers' });
                    return distanceInKilometers <= distance;
                }
                return false;
            });

            const formattedNearbyModels = nearbyModels.map(model => {
                const urls = model.model_images.map(image => image.url);
                return {
                    id: model.id,
                    description: model.description,
                    address: model.address,
                    name: model.name,
                    rate: model.rate,
                    numberRate: model.numberRate,
                    urls: urls,
                    typeName: model.modelType.typeName
                };
            });

            return res.status(200).json({
                success: true,
                data: formattedNearbyModels
            });
        } catch (error) {
            console.error("Error in GetNearbyModels:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetNearbyDestination(req, res) {
        try {
            const { address, distance = 50, rate } = req.query;

            const destinationFind = await Destination.findOne({
                where: { address: address },
                attributes: ['latitude', 'longitude']
            });

            if (!destinationFind) {
                return res.status(404).json({
                    success: false,
                    message: "Destination not found with the provided address."
                });
            }

            const { longitude, latitude } = destinationFind.dataValues;

            if (longitude && latitude) {

                const destinationPoint = turf.point([longitude, latitude]);

                const destinations = await Destination.findAll({
                    include: [
                        {
                            model: DestinationImages,
                            attributes: ['url'],
                        },
                        {
                            model: DestinationType,
                            attributes: ['typeName'],
                        }
                    ],
                });

                const nearbyDestinations = destinations.filter(dest => {
                    if (dest.longitude !== longitude || dest.latitude !== latitude) {
                        const distanceInKilometers = turf.distance(destinationPoint, turf.point([dest.longitude, dest.latitude]), { units: 'kilometers' });
                        return distanceInKilometers <= distance;
                    } else {
                        return false
                    }
                });

                const formattedNearbyDestinations = nearbyDestinations.map(model => {
                    const urls = model.destination_images.map(image => image.url);
                    return {
                        id: model.id,
                        description: model.description,
                        address: model.address,
                        name: model.name,
                        rate: model.rate,
                        numberRate: model.numberRate,
                        urls: urls,
                        typeName: model.destinationType.typeName
                    };
                });

                return res.status(200).json({
                    success: true,
                    data: formattedNearbyDestinations
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Latitude or longitude not found for the provided destination."
                });
            }
        } catch (error) {
            console.error("Error in GetNearbyDestination:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetModelsNearByDestination(req, res) {
        try {
            const { address, distance = 50, rate, typeName } = req.query;

            const page = parseInt(req.query.page) || 1;
            const perPage = 12;
            const offset = (page - 1) * perPage;

            const destinationFind = await Destination.findOne({
                where: { address: address },
                attributes: ['latitude', 'longitude']
            });

            if (!destinationFind) {
                return res.status(404).json({
                    success: false,
                    message: "Destination not found with the provided address."
                });
            }

            const { longitude, latitude } = destinationFind.dataValues;

            const destinationPoint = turf.point([longitude, latitude]);

            const models = await Model.findAll({
                include: [
                    {
                        model: ModelImages,
                        attributes: ['url'],
                    },
                    {
                        model: ModelType,
                        attributes: ['typeName'],
                        where: {
                            typeName: typeName
                        }
                    }
                ],
            });

            const nearbyModels = models.filter(model => {
                if (model.longitude !== longitude || model.latitude !== latitude) {
                    const distanceInKilometers = turf.distance(destinationPoint, turf.point([model.longitude, model.latitude]), { units: 'kilometers' });
                    return distanceInKilometers < distance;
                } else {
                    return false
                }
            });

            const formattedNearbyModels = nearbyModels.map(model => {
                const urls = model.model_images.map(image => image.url);
                return {
                    id: model.id,
                    description: model.description,
                    address: model.address,
                    name: model.name,
                    rate: model.rate,
                    numberRate: model.numberRate,
                    urls: urls,
                    typeName: model.modelType.typeName
                };
            });

            const totalCount = formattedNearbyModels.length;
            const totalPages = Math.ceil(totalCount / perPage);
            const currentPageData = formattedNearbyModels.slice(offset, offset + perPage);

            return res.status(200).json({
                success: true,
                totalCount,
                totalPages,
                data: currentPageData
            });

        } catch (error) {
            console.error("Error in GetModelsNearByDestination:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async CalculateDistanceKilometers(req, res) {
        try {
            const { addressFrom, addressTo } = req.body;

            // Lấy thông tin về địa chỉ xuất phát
            const modelFrom = await Model.findOne({
                where: { address: addressFrom },
                attributes: ['latitude', 'longitude']
            });

            if (!modelFrom) {
                return res.status(404).json({
                    success: false,
                    message: "Address From Not Found"
                });
            }

            const { longitude: lon1, latitude: lat1 } = modelFrom.dataValues;

            // Lấy thông tin về địa chỉ đích
            const modelTo = await Model.findOne({
                where: { address: addressTo },
                attributes: ['latitude', 'longitude']
            });

            if (!modelTo) {
                return res.status(404).json({
                    success: false,
                    message: "Address To Not Found"
                });
            }

            const { longitude: lon2, latitude: lat2 } = modelTo.dataValues;

            // Sử dụng geolib để tính toán khoảng cách giữa hai điểm
            const distanceMeters = geolib.getDistance(
                { latitude: lat1, longitude: lon1 },
                { latitude: lat2, longitude: lon2 }
            );

            // Chuyển khoảng cách từ mét sang kilômét và làm tròn đến 2 chữ số thập phân
            const distanceKilometers = (distanceMeters / 1000).toFixed(2);

            return res.status(200).json({
                success: true,
                distance: distanceKilometers + " km"
            });
        } catch (error) {
            console.error("Error in CalculateDistanceKilometers:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async CalculateDistanceDesKilometers(req, res) {
        try {
            const { addressFrom, addressTo } = req.body;

            // Lấy thông tin về địa chỉ xuất phát
            const destinationFrom = await Destination.findOne({
                where: { address: addressFrom },
                attributes: ['latitude', 'longitude']
            });

            if (!destinationFrom) {
                return res.status(404).json({
                    success: false,
                    message: "Address From Not Found"
                });
            }

            const { longitude: lon1, latitude: lat1 } = destinationFrom.dataValues;

            // Lấy thông tin về địa chỉ đích
            const destinationTo = await Destination.findOne({
                where: { address: addressTo },
                attributes: ['latitude', 'longitude']
            });

            if (!destinationTo) {
                return res.status(404).json({
                    success: false,
                    message: "Address To Not Found"
                });
            }

            const { longitude: lon2, latitude: lat2 } = destinationTo.dataValues;

            // Sử dụng geolib để tính toán khoảng cách giữa hai điểm
            const distanceMeters = geolib.getDistance(
                { latitude: lat1, longitude: lon1 },
                { latitude: lat2, longitude: lon2 }
            );

            // Chuyển khoảng cách từ mét sang kilômét và làm tròn đến 2 chữ số thập phân
            const distanceKilometers = (distanceMeters / 1000).toFixed(2);

            return res.status(200).json({
                success: true,
                distance: distanceKilometers + " km"
            });
        } catch (error) {
            console.error("Error in CalculateDistanceDesKilometers:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async getListTypeDestination(req, res) {
        try {
            const listType = await DestinationType.findAll()
            if (listType) {
                res.status(200).json({
                    success: true,
                    data: listType,
                    message: "List type of destination"
                })
            } else {
                res.status(404).json({
                    success: false,
                    data: listType,
                    message: "List type of destination not found"
                })
            }
        } catch (error) {
            console.error("Error in getListTypeDestination:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async getDestinationHighRate(req, res) {
        try {
            const highRatedDestinations = await Destination.findAll({
                include: [
                    {
                        model: DestinationImages,
                        attributes: ['url'],
                    },
                    {
                        model: DestinationType,
                        attributes: ['typeName'],
                    }
                ],
                order: [['rate', 'DESC'], ['numberRate', 'DESC']],
                limit: 4,
            });



            const formattedDestinations = highRatedDestinations.map(destination => {
                let urls = [];
                if (destination.destination_images) {
                    urls = destination.destination_images.map(image => image.url);
                }
                console.log(destination)
                return {
                    id: destination.id,
                    description: destination.description,
                    name: destination.name,
                    address: destination.address,
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                    status: destination.status,
                    rate: destination.rate,
                    numberRate: destination.numberRate,
                    urls: urls,
                    typeName: destination.destinationType.dataValues.typeName,
                };
            });

            return res.status(200).json({
                success: true,
                message: "Top 5 high rated destinations found successfully.",
                data: formattedDestinations
            });
        } catch (error) {
            console.error("Error in getDestinationHighRate:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }


    static async getModelHighRate(req, res) {
        try {
            const { typeName } = req.query

            const type = await ModelType.findOne({
                where: {
                    typeName
                }
            })

            if (type.typeName == "Hotel") {
                const highRatedModels = await Model.findAll({
                    where: {
                        modelTypeId: type.id
                    },
                    include: [
                        {
                            model: ModelImages,
                            attributes: ['url'],
                        },
                        {
                            model: ModelType,
                            attributes: ['typeName'],
                        },
                        {
                            model: Hotel,
                        },
                    ],
                    order: [['rate', 'DESC'], ['numberRate', 'DESC']],
                    limit: 4
                });

                const formattedModels = highRatedModels.map(model => {
                    const urls = model.dataValues.model_images.map(image => image.url);
                    console.log(model.dataValues)
                    return {
                        checkInDate: model.hotel.dataValues.checkInDate,
                        checkOutDate: model.hotel.dataValues.checkOutDate,
                        amenities: model.hotel.dataValues.amenities,
                        numberOfRooms: model.hotel.dataValues.numberOfRooms,
                        numberOfGuestsPerRoom: model.hotel.dataValues.numberOfGuestsPerRoom,
                        pricePerNight: model.hotel.dataValues.pricePerNight,
                        bookingStatus: model.hotel.dataValues.bookingStatus,
                        contactPerson: model.hotel.dataValues.contactPerson,
                        contactEmail: model.hotel.dataValues.contactEmail,
                        model: {
                            id: model.dataValues.id,
                            description: model.dataValues.description,
                            address: model.dataValues.address,
                            name: model.dataValues.name,
                            status: model.dataValues.status,
                            rate: model.dataValues.rate,
                            numberRate: model.dataValues.numberRate,
                            address_location: model.dataValues.address_location,
                            urls: urls,
                            typeName: model.dataValues.modelType.typeName
                        }
                    };
                });

                return res.status(200).json({
                    success: true,
                    message: "Top 5 high rated Models found successfully.",
                    data: formattedModels
                });
            } else if (type.typeName == "Flight") {
                const highRatedModels = await Model.findAll({
                    where: {
                        modelTypeId: type.id
                    },
                    include: [
                        {
                            model: ModelImages,
                            attributes: ['url'],
                        },
                        {
                            model: ModelType,
                            attributes: ['typeName'],
                        },
                        {
                            model: Flight,
                        },
                    ],
                    order: [['rate', 'DESC'], ['numberRate', 'DESC']],
                    limit: 4
                });

                const formattedModels = highRatedModels.map(model => {
                    const urls = model.dataValues.model_images.map(image => image.url);
                    console.log(model.dataValues)
                    return {
                        departureTime: model.flight.dataValues.departureTime,
                        arrivalTime: model.flight.dataValues.arrivalTime,
                        origin: model.flight.dataValues.origin,
                        destination: model.flight.dataValues.destination,
                        flightNumber: model.flight.dataValues.flightNumber,
                        price: model.flight.dataValues.price,
                        seatCapacity: model.flight.dataValues.seatCapacity,
                        availableSeats: model.flight.dataValues.availableSeats,
                        airline: model.flight.dataValues.airline,
                        model: {
                            id: model.dataValues.id,
                            description: model.dataValues.description,
                            address: model.dataValues.address,
                            name: model.dataValues.name,
                            status: model.dataValues.status,
                            rate: model.dataValues.rate,
                            numberRate: model.dataValues.numberRate,
                            address_location: model.dataValues.address_location,
                            urls: urls,
                            typeName: model.dataValues.modelType.typeName
                        }
                    };
                });

                return res.status(200).json({
                    success: true,
                    message: "Top 5 high rated Models found successfully.",
                    data: formattedModels
                });
            } else if (type.typeName == "Car") {
                const highRatedModels = await Model.findAll({
                    where: {
                        modelTypeId: type.id
                    },
                    include: [
                        {
                            model: ModelImages,
                            attributes: ['url'],
                        },
                        {
                            model: ModelType,
                            attributes: ['typeName'],
                        },
                        {
                            model: Car,
                        },
                    ],
                    order: [['rate', 'DESC'], ['numberRate', 'DESC']],
                    limit: 4
                });

                const formattedModels = highRatedModels.map(model => {
                    const urls = model.dataValues.model_images.map(image => image.url);
                    console.log(model.dataValues)
                    return {
                        type: model.car.dataValues.type,
                        color: model.car.dataValues.color,
                        size: model.car.dataValues.size,
                        pricePerHour: model.car.dataValues.pricePerHour,
                        availability: model.car.dataValues.availability,
                        location: model.car.dataValues.location,
                        model: {
                            id: model.dataValues.id,
                            description: model.dataValues.description,
                            address: model.dataValues.address,
                            name: model.dataValues.name,
                            status: model.dataValues.status,
                            rate: model.dataValues.rate,
                            numberRate: model.dataValues.numberRate,
                            address_location: model.dataValues.address_location,
                            urls: urls,
                            typeName: model.dataValues.modelType.typeName
                        }
                    };
                });

                return res.status(200).json({
                    success: true,
                    message: "Top 5 high rated Models found successfully.",
                    data: formattedModels
                });
            }
        } catch (error) {
            console.error("Error in getModelHighRate:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async autoCreateImageOfModel(req, res) {
        try {
            const { id } = req.params
            const listImage = []
            for (let i = 0; i < 3; i++) {
                const imageUrl = faker.image.url();
                const result = await cloundinary.uploader.upload(imageUrl, {
                    upload_preset: 'vnldjdbe',
                    public_id: `unique_id_${Date.now()}`
                });

                const createdImage = await ModelImages.create({
                    url: result.secure_url,
                    publicId: result.public_id,
                    modelId: id
                });
                listImage.push(createdImage)
            }
            return res.status(200).json({
                data: listImage
            })
        } catch (error) {
            console.error("Error in autoCreateImageOfModel:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async autoCreateImageOfDestination(req, res) {
        try {
            const { id } = req.params
            const listImage = []
            for (let i = 0; i < 3; i++) {
                const imageUrl = faker.image.url()
                const result = await cloundinary.uploader.upload(imageUrl, {
                    upload_preset: 'vnldjdbe',
                    public_id: `unique_id_${Date.now()}`
                });

                const createdImage = await DestinationImages.create({
                    url: result.secure_url,
                    publicId: result.public_id,
                    destinationId: id
                });
                listImage.push(createdImage)
            }
            return res.status(200).json({
                data: listImage
            })
        } catch (error) {
            console.error("Error in autoCreateImageOfModel:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }
}
exports.ModelController = ModelController