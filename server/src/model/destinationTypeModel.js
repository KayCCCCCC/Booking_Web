module.exports = (sequelize, DataTypes) => {
    const DestinationType = sequelize.define("destinationType", {
        typeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return DestinationType;
};
