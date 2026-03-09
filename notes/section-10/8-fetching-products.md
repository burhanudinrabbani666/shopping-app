# Fetching Products from a Database

This guide covers how to retrieve product data from a MySQL database and display it using the MVC pattern: **Model → Controller → View**.

---

## 1. Database Connection (`database.js`)

```js
// database.js
const mysql = require("mysql2");

// Creates a pool of reusable connections (more efficient than single connections)
const pool = mysql.createPool({
  host: "localhost", // Database server location
  user: "root", // Database username
  password: "root", // Database password
  database: "shopping-app", // Target database name
});

// Export with promise support so we can use async/await or .then()
module.exports = pool.promise();
```

> **Why a connection pool?** A pool reuses existing connections instead of opening a new one on every request, improving performance under load.

---

## 2. Model — Fetching All Products

```js
// models/product.js
static fetchAll() {
  // Executes a SQL query and returns a Promise
  return db.execute("SELECT * FROM products");
}
```

> **Note:** The method is named `fetchAll` (not `_fetchAll` — the underscore prefix is unnecessary and misleading). It returns a Promise that resolves to `[rows, fieldData]`.

---

## 3. Controller — Handling the Request

```js
// controllers/shop.js
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      // `rows` = array of product objects from the database
      // `fieldData` = metadata about columns (usually not needed)
      res.render("shop/product-list", {
        prods: rows, // Pass products to the template
        pageTitle: "Products - Shop",
        path: "/", // Used to highlight the active nav link
      });
    })
    .catch((error) => console.log(error)); // Log any DB errors
};
```

---

## How It All Works Together

```
HTTP Request (GET /)
        ↓
   Controller (getIndex)
        ↓
   Model (fetchAll) ──→ MySQL DB (SELECT * FROM products)
        ↓
   [rows] returned as Promise
        ↓
   res.render() sends data to the View
        ↓
   HTML Response rendered to the user
```

1. A user visits `/` in the browser.
2. The router calls `getIndex` in the shop controller.
3. The controller calls `Product.fetchAll()`, which queries the database.
4. MySQL returns all rows; the controller passes them to the template as `prods`.
5. The view renders the product list and sends it back as HTML.

---

## Key Points

- **MVC separation**: Database logic lives in the model, rendering logic in the controller — keeping code organized and easy to maintain.
- **Promise-based queries**: `mysql2`'s `.promise()` lets you use `.then()/.catch()` or `async/await` instead of callbacks.
- **Destructuring the result**: `db.execute()` resolves to `[rows, fieldData]` — you almost always only need `rows`.
- **Error handling**: Always include `.catch()` (or `try/catch`) to avoid unhandled promise rejections crashing the server.

---

Next: [Fetching Products — Time to Practice](./9-fetching-products-time-to-practice.md)
