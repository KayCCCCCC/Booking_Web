module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Role;
};
