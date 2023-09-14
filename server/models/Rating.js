const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/dbconnect");
const User = require("./User");
const Review = require("./Review");

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Rating",
    tableName: "ratings",
    timestamps: false,
  }
);

Rating.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

Rating.belongsTo(Review, {
  foreignKey: "reviewId",
  targetKey: "id",
});

module.exports = Rating;
