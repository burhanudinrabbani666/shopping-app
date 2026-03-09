# Fetching products

Creating new utils for get data from local database

```js
// database.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "shopping-app",
  password: "root",
});

module.exports = pool.promise();
```

use in models

```js
  static _fetchAll() {
    return db.execute("SELECT * FROM products");
  }
```

displaying data in routes function

```js
// controller/shop.js
exports.getIndex = (req, res, next) => {
  Product._fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Products - Shop",
        path: "/",
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [Fetching products time to practice](./9-fetching-products-time-to-practice.md)
