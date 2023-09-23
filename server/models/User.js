const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/dbconnect");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
