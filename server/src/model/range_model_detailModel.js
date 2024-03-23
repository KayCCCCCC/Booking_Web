module.exports = (sequelize, DataTypes) => {
    const Range_Model_Detail = sequelize.define("range_model_detail", {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    return Range_Model_Detail
};
