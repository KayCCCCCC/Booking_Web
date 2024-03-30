module.exports = (sequelize, DataTypes) => {
    const Cookie = sequelize.define("cookie", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Cookie;
};
