module.exports = (sequelize, DataTypes) => {
    const Voucher = sequelize.define("voucher", {
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        thumNail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maxDiscount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    });

    return Voucher;
};
