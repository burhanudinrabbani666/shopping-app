# Inserting Data into the Database

Covers how to save a new product to MySQL using a model method and a controller handler.

---

## 1. Model — Save Method

```js
// models/product.js
save() {
  return db.execute(
    // `?` placeholders are safely replaced by the array values below (prevents SQL injection)
    "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
    [this.title, this.price, this.imageUrl, this.description]
  );
}
```

> **Why use `?` placeholders?** Passing values separately instead of concatenating them into the query string protects against SQL injection attacks.

---

## 2. Controller — Handling the Form Submission

```js
// controllers/shop.js
exports.postAddProduct = (req, res, next) => {
  // Extract each field from the submitted form body
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // Pass `null` as the ID — MySQL will auto-generate it via AUTO_INCREMENT
  const product = new Product(null, title, imageUrl, description, price);

  product
    .save()
    .then(() => res.redirect("/")) // On success, return to the product list
    .catch((error) => console.log(error)); // Log any DB errors
};
```

> **Why `null` for ID?** The database column is set to `AUTO_INCREMENT`, so MySQL assigns the ID automatically on insert. You never need to supply one manually when creating a new record.

---

## How It All Works Together

```
POST /add-product (form submit)
        ↓
   Controller (postAddProduct)
        ↓
   Extracts fields from req.body
        ↓
   new Product(null, title, imageUrl, description, price)
        ↓
   product.save() ──→ MySQL INSERT query
        ↓
   res.redirect("/") sends user back to product list
```

---

## Key Points

- **Parameterized queries**: Always use `?` placeholders — never string-concatenate user input into SQL.
- **AUTO_INCREMENT ID**: Passing `null` lets MySQL handle ID generation; no manual ID tracking needed.
- **Argument order matters**: Ensure the order you pass values to `new Product(...)` matches the order the constructor expects.
- **Redirect after POST**: Redirecting after a successful insert prevents duplicate submissions if the user refreshes the page.

---

Next: [Fetching a Single Product with a WHERE Condition](./11-fetching-a-single-product-with-where-condition.md)
