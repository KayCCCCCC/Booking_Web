module.exports = (sequelize, DataTypes) => {
    const Range_Model = sequelize.define("range_model", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValues: 'Active'
        },
        cost: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Range_Model;
};
