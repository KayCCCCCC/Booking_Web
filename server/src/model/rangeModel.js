module.exports = (sequelize, DataTypes) => {
    const Range = sequelize.define("range", {
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addressCity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addressCountry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneSupport: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Active'
        },
    });

    return Range
};
