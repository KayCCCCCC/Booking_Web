const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../database/connectDb");
const sequelize = require("../database/connectDbPg");
const { fa } = require("@faker-js/faker");

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
db.model_images = require("./modelImagesModel")(sequelize, DataTypes);
db.flight = require('./flightModel')(sequelize, DataTypes);
db.car = require('./carModel')(sequelize, DataTypes);
db.hotel = require('./hotelModel')(sequelize, DataTypes);
db.destination = require('./destinationModel')(sequelize, DataTypes);
db.destinationType = require('./destinationTypeModel')(sequelize, DataTypes);
db.destinationImages = require('./destinationImagesModel')(sequelize, DataTypes);
db.blogComment = require("./blogCommentModel")(sequelize, DataTypes);
db.blogRating = require("./blogRatingModel")(sequelize, DataTypes);
db.blog = require("./blogModel")(sequelize, DataTypes);
db.voteBlogComment = require("./voteBlogCommentModel")(sequelize, DataTypes);
db.notification = require("./notificationModel")(sequelize, DataTypes);
db.favorite = require('./favoriteModelUserModel')(sequelize, DataTypes);

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

db.destinationType.hasMany(db.destination)
db.destination.belongsTo(db.destinationType, {
    foreignKey: "destinationTypeId",
});

db.model.hasOne(db.hotel)
db.hotel.belongsTo(db.model);

db.model.hasOne(db.flight)
db.flight.belongsTo(db.model);

db.model.hasOne(db.car)
db.car.belongsTo(db.model);


db.model.hasMany(db.voucher)
db.voucher.belongsTo(db.model, {
    foreignKey: "modelId",
});

db.model.hasMany(db.model_images)
db.model_images.belongsTo(db.model, {
    foreignKey: "modelId",
});

db.destination.hasMany(db.destinationImages)
db.destinationImages.belongsTo(db.destination, {
    foreignKey: "destinationId",
});

db.model.belongsToMany(db.range, { through: 'range_model', foreignKey: 'modelId' });
db.range.belongsToMany(db.model, { through: 'range_model', foreignKey: 'rangeId' });

db.model.belongsToMany(db.user, { through: 'favorite_model_user', foreignKey: 'modelId' });
db.user.belongsToMany(db.model, { through: 'favorite_model_user', foreignKey: 'userId' });

db.range_model.hasMany(db.range_model_detail)
db.range_model_detail.belongsTo(db.range_model, {
    foreignKey: "rangeModelId",
});

db.user.hasMany(db.blog);
db.blog.belongsTo(db.user, {
    foreignKey: "userId",
});

db.user.hasMany(db.blogComment);
db.blogComment.belongsTo(db.user, {
    foreignKey: "userId",
});

db.blog.hasMany(db.blogComment);
db.blogComment.belongsTo(db.blog, {
    foreignKey: "blogId",
});

db.blogComment.belongsTo(db.blogComment, {
    foreignKey: "replyCommentId",
});
db.blogComment.hasMany(db.blogComment, {
    foreignKey: "replyCommentId",
});

db.blogComment.belongsToMany(db.user, {
    through: db.voteBlogComment,
});
db.user.belongsToMany(db.blogComment, {
    through: db.voteBlogComment,
});

db.user.hasMany(db.blogRating);
db.blogRating.belongsTo(db.user, {
    foreignKey: "userId",
});

db.blog.hasMany(db.blogRating);
db.blogRating.belongsTo(db.blog);

db.user.hasMany(db.notification);
db.notification.belongsTo(db.user, {
    foreignKey: "userId",
});

db.sequelize.sync({ logging: false, force: false }).then(() => {
    console.log("Re-sync success");
});
module.exports = db;