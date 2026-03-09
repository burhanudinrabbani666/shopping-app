# Connecting to the database

```js
const Sequlize = require("sequelize");

const sequelize = new Sequlize("shopping-app", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
```

Next: [Defining a model](./3-defining-a-model.md)
