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
        }
    });

    return Model
};
