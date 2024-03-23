module.exports = (sequelize, DataTypes) => {
  const BlogComment = sequelize.define(
    "blog_comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      total_votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
    },
    {
      timeStamp: true,
    }
  );

  return BlogComment;
};
