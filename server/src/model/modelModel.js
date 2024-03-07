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
        nameOfModel: {
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
        address_location: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: true,
            defaultValue: null,
        },
    });

    return Model;
};
