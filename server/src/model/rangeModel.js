module.exports = (sequelize, DataTypes) => {
    const Range = sequelize.define("range", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressCountry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneSupport: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Range
};
