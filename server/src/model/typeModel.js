module.exports = (sequelize, DataTypes) => {
    const ModelType = sequelize.define("modelType", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return ModelType
};
