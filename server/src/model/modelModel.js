module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("model", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        rate: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        numberRate: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iso2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address_location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    });

    return Model;
};
