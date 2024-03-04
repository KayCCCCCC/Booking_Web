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
        rate: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        numberRate: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return Model;
};
