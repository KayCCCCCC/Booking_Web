module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("booking", {
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        statusBooking: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Booking;
};
