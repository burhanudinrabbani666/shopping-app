const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

// ---------------------------------- //

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = User;
