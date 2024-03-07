module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define("car", {
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pricePerHour: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },        // Thuộc tính khác cho việc đặt xe đạp
        availability: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Car;
};
