module.exports = (sequelize, DataTypes) => {
  const VoteBlogComment = sequelize.define("vote_blog_comment", {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return VoteBlogComment;
};
