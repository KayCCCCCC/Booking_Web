module.exports = (sequelize, DataTypes) => {
    const FavoriteModel = sequelize.define("favorite_model_user", {
        status: {
            type: DataTypes.STRING,
            defaultValue: "Active",
            allowNull: true,
        },
    });

    return FavoriteModel;
};
