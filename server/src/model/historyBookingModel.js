module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("booking", {
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        costPerUnit: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        statusBooking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    return Booking;
};
