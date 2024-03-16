module.exports = (sequelize, DataTypes) => {
    const ModelImages = sequelize.define("model_images", {
        publicId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return ModelImages;
};
