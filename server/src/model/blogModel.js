module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "blog",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Processing",
      },
    },
    {
      timeStamp: true,
    }
  );

  return Blog;
};
