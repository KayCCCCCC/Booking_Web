const { ModelController } = require("../controller/modelController");
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

router.post("/auto-create-model-type", ModelController.AutoCreateModalType)
router.post("/auto-create-destination-type", ModelController.AutoCreateDestinationType)
router.post("/auto-create-model", ModelController.AutoCreateModel)
router.post("/auto-create-destination", ModelController.AutoCreateDestination)
router.post("/auto-create-hotel", ModelController.AutoCreateHotels)
router.post("/auto-create-flight", ModelController.AutoCreateFlights)
router.post("/auto-create-car", ModelController.AutoCreateCars)


router.post("/create", upload.array('images', 10), ModelController.CreateModel)
router.get("/getBy/:id", ModelController.GetModelById)
router.patch("/update/:id", upload.array('images', 10), ModelController.UpdateModel)
router.delete("/delete/:id", ModelController.DeleteModel)
router.get("/get-all-model", ModelController.GetAllModels)
router.get("/get-all-destination", ModelController.GetAllDestination)
router.get("/getNearbyModels", ModelController.GetNearbyModels)
router.get("/getNearbyDestinations", ModelController.GetNearbyDestination)
router.get("/getModelByDestinations", ModelController.GetModelsNearByDestination)
router.get("/getModelHighest", ModelController.getModelHighRate)
router.get("/getDestinationHighest", ModelController.getDestinationHighRate)
router.get("/distance", ModelController.CalculateDistanceKilometers)
router.get("/distance_destination", ModelController.CalculateDistanceDesKilometers)
router.get("/list-type-destination", ModelController.getListTypeDestination)


router.post("/create-bookmark-model", ModelController.CreateBookMark)



router.get("/filter-hotel", ModelController.FilterHotel)
router.get("/filter-flight", ModelController.FilterFlight)
router.get("/filter-car", ModelController.FilterCar)
router.get("/filter-destination", ModelController.FilterDestination)

module.exports = router;