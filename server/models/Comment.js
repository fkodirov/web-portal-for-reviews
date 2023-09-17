const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/dbconnect");
const User = require("./User");
const Review = require("./Review");

class Comment extends Model {}

Comment.init(
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
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
  }
);

Comment.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

Comment.belongsTo(Review, {
  foreignKey: "reviewId",
  targetKey: "id",
});

module.exports = Comment;
