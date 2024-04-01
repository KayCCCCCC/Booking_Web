const { faker } = require('@faker-js/faker');
const db = require('../model/index')
const RangeModel = db.range_model
const RangeModelDetail = db.range_model_detail

class RangeModelController {
    static async AutoCreateRangeModel(req, res) {
        try {
            const numModels = 60;

            const models = [];
            for (let i = 1; i <= numModels; i++) {
                const model = await RangeModel.create({
                    description: faker.lorem.words(),
                    cost: faker.number.float({ min: 1000, max: 100000 }),
                    quantity: faker.number.int({ min: 1, max: 100 }),
                    modelId: i,
                    rangeId: i,
                    status: 'Active'
                });

                const rangeModelDetail = await RangeModelDetail.create({
                    code: faker.airline.flightNumber(),
                    status: 'Active',
                    rangeModelId: i
                });

                models.push(model);
            }

            return res.status(201).json({
                success: true,
                message: `Auto created ${numModels} models successfully`,
                data: models
            });
        } catch (error) {
            console.error("Error in AutoCreateRangeModel:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }

}
exports.RangeModelController = RangeModelController