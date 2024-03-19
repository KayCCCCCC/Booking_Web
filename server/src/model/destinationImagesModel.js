module.exports = (sequelize, DataTypes) => {
    const DestinationImages = sequelize.define("destination_images", {
        publicId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return DestinationImages;
};
