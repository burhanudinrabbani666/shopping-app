# Fetching a Single Product with a WHERE Condition

Covers how to retrieve one specific product from the database by its ID and render a detail page.

---

## 1. Model — Find by ID

```js
// models/product.js
static findById(id) {
  // `?` is replaced by `id` safely — prevents SQL injection
  return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
}
```

> **`WHERE products.id = ?`** filters the result to only the row matching the given ID, so the query always returns at most one product.

---

## 2. Controller — Handling the Request

```js
// controllers/shop.js
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId; // Extracted from the URL, e.g. /products/42

  Product.findById(productId)
    .then(([rows]) => {
      // `rows` is an array — grab the first (and only) result
      const product = rows[0];

      res.render("shop/product-detail", {
        product: product,
        pageTitle: `Shop - ${product.title}`, // e.g. "Shop - Running Shoes"
        path: "/products", // Highlights the correct nav link
      });
    })
    .catch((error) => console.log(error));
};
```

> **Why `rows[0]`?** Even when only one row matches, `db.execute()` always returns an array. Index `[0]` pulls out the single product object.

---

## How It All Works Together

```
GET /products/42
        ↓
   Controller (getProduct)
        ↓
   req.params.productId → "42"
        ↓
   Product.findById("42") ──→ SELECT * FROM products WHERE id = 42
        ↓
   rows[0] — the matching product object
        ↓
   res.render() sends product data to the detail view
```

---

## Key Points

- **`req.params`** reads dynamic URL segments — the route must be defined as `/products/:productId` for this to work.
- **Always index with `[0]`**: `db.execute()` resolves to `[rows, fieldData]`. Destructure to `[rows]` first, then access `rows[0]` for the single record.
- **Parameterized query**: The `?` placeholder keeps the query safe — never interpolate `id` directly into the SQL string.
- **`pageTitle` bug**: The original code used `product.title` before indexing into the array. With `rows[0]` assigned first, `product.title` now works correctly.

---

Next: [Wrap Up](./12-wrap-up.md)
