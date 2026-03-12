# Defining a model

```js
// product.js
const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  price: { type: DataTypes.DOUBLE, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Product;
```

Next: [Syncing js definitions to the database](./4-syncing-js-definitions-to-the-database.md)
