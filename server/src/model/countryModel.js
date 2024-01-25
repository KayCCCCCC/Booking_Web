module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define("country", {
        addressCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressCountry: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Country;
};
