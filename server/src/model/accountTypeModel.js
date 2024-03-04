module.exports = (sequelize, DataTypes) => {
    const Account_Type = sequelize.define("account_type", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Account_Type;
};
