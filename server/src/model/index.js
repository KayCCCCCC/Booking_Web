const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../database/connectDb");
const sequelize = require("../database/connectDbPg");

const db = {};
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, DataTypes);
db.role = require("./roleModel")(sequelize, DataTypes);
db.account_type = require("./accountTypeModel")(sequelize, DataTypes);
db.booking = require("./historyBookingModel")(sequelize, DataTypes);
db.voucher = require("./voucherModel")(sequelize, DataTypes);
db.model = require("./modelModel")(sequelize, DataTypes);
db.modelType = require("./typeModel")(sequelize, DataTypes);
db.range = require("./rangeModel")(sequelize, DataTypes);
db.range_model = require("./range_modelModel")(sequelize, DataTypes);
db.range_model_detail = require("./range_model_detailModel")(sequelize, DataTypes);
db.country = require("./countryModel")(sequelize, DataTypes);
db.model_images = require("./modelImgaesModel")(sequelize, DataTypes);


//relation

db.role.hasMany(db.user);
db.user.belongsTo(db.role, {
    foreignKey: "roleId",
});

db.account_type.hasMany(db.user);
db.user.belongsTo(db.account_type, {
    foreignKey: "accountTypeId",
});

db.user.hasMany(db.booking);
db.booking.belongsTo(db.user, {
    foreignKey: "userId",
});

db.range_model_detail.hasMany(db.booking);
db.booking.belongsTo(db.range_model_detail, {
    foreignKey: "rangeModelDetailId",
});


db.modelType.hasMany(db.model)
db.model.belongsTo(db.modelType, {
    foreignKey: "modelTypeId",
});

db.model.hasMany(db.voucher)
db.voucher.belongsTo(db.model, {
    foreignKey: "modelId",
});

db.model.hasMany(db.model_images)
db.model_images.belongsTo(db.model, {
    foreignKey: "modelId",
});

db.model.belongsToMany(db.range, { through: 'range_model', foreignKey: 'modelId' });
db.range.belongsToMany(db.model, { through: 'range_model', foreignKey: 'rangeId' });

db.range_model.hasMany(db.range_model_detail)
db.range_model_detail.belongsTo(db.range_model, {
    foreignKey: "rangeModelId",
});

db.sequelize.sync({ logging: false, force: false }).then(() => {
    console.log("Re-sync success");
});
module.exports = db;