const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

// ---------------------------------- //

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = User;
