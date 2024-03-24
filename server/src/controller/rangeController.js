const db = require('../model/index')
const { faker } = require('@faker-js/faker');

const Range = db.range
const RangeModel = db.range_model
const RangeModelDetail = db.range_model_detail

class RangeController {
    static async GetAllRanges(req, res) {
        try {
            const ranges = await Range.findAll();
            return res.status(200).json({
                success: true,
                data: ranges
            });
        } catch (error) {
            console.error("Error in GetAllRanges:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async GetRangeById(req, res) {
        try {
            const { id } = req.params;
            const range = await Range.findByPk(id);
            if (range) {
                return res.status(200).json({
                    success: true,
                    data: range
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Range not found"
                });
            }
        } catch (error) {
            console.error("Error in GetRangeById:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async UpdateRange(req, res) {
        try {
            const { id } = req.params;
            const { description, addressCity, addressCountry, phoneSupport } = req.body;
            const range = await Range.findByPk(id);
            if (range) {
                if (description) range.description = description
                if (addressCity) range.addressCity = addressCity
                if (addressCountry) range.addressCountry = addressCountry
                if (phoneSupport) range.phoneSupport = phoneSupport
                await Range.update(range)
                return res.status(200).json({
                    success: true,
                    message: "Range updated successfully"
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Range not found"
                });
            }
        } catch (error) {
            console.error("Error in UpdateRange:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }


    static async CreateRange(req, res) {
        try {
            const { description, addressCity, addressCountry, phoneSupport } = req.body

            if (description && addressCity && addressCountry && phoneSupport) {
                const range = await Range.create({
                    description,
                    addressCity,
                    addressCountry,
                    phoneSupport
                })

                return res.status(201).json({
                    success: true,
                    message: 'Create range success',
                    data: range
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Create range fail',
                })
            }
        } catch (error) {
            console.error("Error in CreateRange:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async DeleteRange(req, res) {
        try {
            const { id } = req.params;
            const range = await Range.findByPk(id);
            if (range) {
                range.status = 'InActive'
                await Range.update(range)
                return res.status(200).json({
                    success: true,
                    message: "Range deleted successfully"
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Range not found"
                });
            }
        } catch (error) {
            console.error("Error in DeleteRange:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

    static async AutoCreateRange(req, res) {
        try {
            const numRanges = 10;

            const ranges = [];
            for (let i = 0; i < numRanges; i++) {
                const range = await Range.create({
                    description: faker.lorem.words(),
                    addressCity: faker.location.city(),
                    addressCountry: faker.location.country(),
                    phoneSupport: faker.phone.number()
                });
                ranges.push(range);
            }

            return res.status(201).json({
                success: true,
                message: `Auto created ${numRanges} ranges successfully`,
                data: ranges
            });
        } catch (error) {
            console.error("Error in AutoCreateRange:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }


}
exports.RangeController = RangeController