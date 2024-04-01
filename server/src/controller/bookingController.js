const db = require('../model/index')
const { faker } = require('@faker-js/faker');
const Booking = db.booking
const User = db.user
const RangeModelDetail = db.range_model_detail
const RangeModel = db.range_model
class BookingController {
    static async CreateBooking(req, res) {
        try {
            const { startDate, expireDate, quantity, total, userId, itemId } = req.body;

            if (!startDate || !expireDate || !quantity || !total || !userId || !itemId) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }

            const startDateObj = new Date(startDate);
            const expireDateObj = new Date(expireDate);

            if (startDateObj >= expireDateObj) {
                return res.status(400).json({
                    success: false,
                    message: "Start date must be before expire date"
                });
            }

            const newBooking = await Booking.create({
                startDate: startDateObj,
                expireDate: expireDateObj,
                quantity,
                total,
                statusBooking: 'Pending',
                userId: userId,
                rangeModelDetailId: itemId
            });

            return res.status(201).json({
                success: true,
                message: "Booking created successfully",
                booking: newBooking
            });
        } catch (error) {
            console.error("Error CreateBooking:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });

        }
    }
    static async UpdateBookingStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updatedBooking = await Booking.update({ statusBooking: status }, {
                where: { id: id }
            });

            if (!updatedBooking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Booking status updated successfully"
            });
        } catch (error) {
            console.error("Error UpdateBookingStatus:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async CancelBooking(req, res) {
        try {
            const { id } = req.params;

            const cancelBooking = await Booking.update({ statusBooking: 'Cancel' }, {
                where: { id: id }
            });

            if (cancelBooking === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Booking canceled successfully"
            });
        } catch (error) {
            console.error("Error CancelBooking:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetAllBookings(req, res) {
        try {
            const bookings = await Booking.findAll();

            return res.status(200).json({
                success: true,
                bookings
            });
        } catch (error) {
            console.error("Error GetAllBookings:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetBookingDetail(req, res) {
        try {
            const { id } = req.params;

            const booking = await Booking.findOne({
                where: { id: id },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email', 'phone', 'address']
                    },
                    {
                        model: RangeModelDetail,
                        attributes: ['code', 'status'],
                        include: {
                            model: RangeModel,
                            attributes: ['description', 'status', 'cost', 'quantity']
                        }
                    }
                ]
            });

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });
            }

            return res.status(200).json({
                success: true,
                booking
            });
        } catch (error) {
            console.error("Error GetBookingDetail:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetBookingDetailOfUser(req, res) {
        try {
            const { id } = req.params;

            const booking = await Booking.findAll({
                where: { userId: id },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email', 'phone', 'address']
                    },
                    {
                        model: RangeModelDetail,
                        attributes: ['code', 'status'],
                        include: {
                            model: RangeModel,
                            attributes: ['description', 'status', 'cost', 'quantity']
                        }
                    }
                ]
            });

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });
            }

            return res.status(200).json({
                success: true,
                booking
            });
        } catch (error) {
            console.error("Error GetBookingDetail:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async AutoCreateBooking(req, res) {
        try {
            const bookings = [];
            for (let i = 1; i <= 60; i++) {
                const startDate = faker.date.future();
                const expireDate = faker.date.future();
                const quantity = faker.number.int({ min: 1, max: 10 });
                const total = faker.number.float({ min: 100, max: 1000 });
                const statusBooking = faker.helpers.arrayElement(['Confirmed', 'Pending', 'Cancelled']);
                const userId = i;
                const rangeModelDetailId = i;
                const booking = await Booking.create({
                    startDate,
                    expireDate,
                    quantity,
                    total,
                    statusBooking,
                    userId,
                    rangeModelDetailId
                })

                bookings.push(booking);
            }
            return res.status(200).json({
                success: true,
                message: "Bookings created successfully.",
                bookings
            });
        } catch (error) {
            console.error("Error AutoCreateBooking:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }
}

exports.BookingController = BookingController