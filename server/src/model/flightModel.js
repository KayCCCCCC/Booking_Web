module.exports = (sequelize, DataTypes) => {
    const Flight = sequelize.define("flight", {
        // departureTime: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // },
        // arrivalTime: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // },
        origin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        flightNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        // Thuộc tính khác cho việc đặt chỗ
        seatCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availableSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        airline: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Flight;
};
