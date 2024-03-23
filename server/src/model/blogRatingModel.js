module.exports = (sequelize, DataTypes) => {
  const BlogRating = sequelize.define("blog_rating", {
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });

  return BlogRating;
};
