module.exports = (sequelize, DataTypes) => {
    const Range_Model_Detail = sequelize.define("range_model_detail", {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValues: 'Active'
        },
    });

    return Range_Model_Detail
};
