const Sequlize = require("sequelize");

const sequelize = new Sequlize("shopping-app", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
