const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("shopping-app", "root", "root", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
