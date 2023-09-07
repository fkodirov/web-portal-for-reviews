const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/dbconnect");
const User = require("./User");
const Review = require("./Review");

class Like extends Model {}

Like.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Like",
    tableName: "likes",
    timestamps: false,
  }
);

Like.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

Like.belongsTo(Review, {
  foreignKey: "reviewId",
  targetKey: "id",
});

module.exports = Like;
