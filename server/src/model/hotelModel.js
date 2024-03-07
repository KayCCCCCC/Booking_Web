module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define("hotel", {
        checkInDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        checkOutDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        amenities: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberOfRooms: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        numberOfGuestsPerRoom: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pricePerNight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },        // Thuộc tính khác cho việc đặt phòng
        bookingStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactPerson: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Hotel;
};
