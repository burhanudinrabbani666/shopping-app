const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const OrderItem = sequelize.define("order_item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = OrderItem;
