module.exports = (sequelize, DataTypes) => {
    const ModelType = sequelize.define("modelType", {
        typeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return ModelType
};
