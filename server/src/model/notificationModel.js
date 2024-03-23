module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Notification;
};
