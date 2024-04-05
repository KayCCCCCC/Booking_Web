module.exports = (sequelize, DataTypes) => {
    const DesCookie = sequelize.define("des_cookie", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return DesCookie;
};