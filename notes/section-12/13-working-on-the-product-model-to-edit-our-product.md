# Editing Products with MongoDB

**Reference:** [MongoDB Update Documents Docs](https://www.mongodb.com/docs/manual/tutorial/update-documents/)

---

## Overview

To support editing a product, we need to:

1. Make `save()` smart enough to **update** an existing product instead of always inserting
2. Build a `postEditProduct` controller that collects form data and calls `save()`

The key insight: if a product already has an `_id`, it exists in the database — so we update it. If there's no `_id`, it's new — so we insert it.

---

## 1. The `save()` Method — Insert or Update

```js
save() {
  const db = getDB();
  let dbOp;

  if (this._id) {
    // Product exists → UPDATE the matching document
    dbOp = db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(this._id) }, // Filter: find by ID
        { $set: this }                    // $set: replace fields with current values
      );
  } else {
    // No _id → INSERT as a new product
    dbOp = db.collection("products").insertOne(this);
  }

  return dbOp
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log(error));
}
```

### How It Works

| Scenario                    | `this._id`        | Operation                                  |
| --------------------------- | ----------------- | ------------------------------------------ |
| Creating a new product      | `undefined`       | `insertOne` — adds a new document          |
| Editing an existing product | e.g. `"64abc..."` | `updateOne` with `$set` — updates in place |

**Key notes:**

- `$set: this` tells MongoDB to update **only the fields on the instance** — it won't erase other fields not present on `this`
- `new ObjectId(this._id)` is required because `_id` is stored as an `ObjectId` in MongoDB, not a plain string
- The `if/else` branch is determined at runtime — the same `save()` handles both flows

---

## 2. The `postEditProduct` Controller

This function runs when the admin submits the edit product form.

```js
exports.postEditProduct = (req, res) => {
  // Extract updated values from the submitted form
  const id = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // Create a Product instance with the existing ID — this triggers the UPDATE branch in save()
  const updateProduct = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    new ObjectId(id), // Passing the ID tells save() to update, not insert
  );

  updateProduct
    .save()
    .then(() => {
      console.log("Updated Product!");
      res.redirect("/admin/products"); // Redirect back to product list
    })
    .catch((error) => console.log(error));
};
```

### How It Works

1. The form submits `productId` as a hidden input alongside the editable fields
2. We reconstruct a `Product` instance with the **existing `_id`** — this is what signals `save()` to update
3. `save()` runs `updateOne`, replacing the fields in MongoDB with the new values
4. On success, the user is redirected to `/admin/products`

> **Important:** The `Product` constructor must accept `_id` as a parameter (typically the last argument). Make sure your constructor stores it as `this._id`.

---

## Complete Flow

```
Edit Form Submitted
       │
       ▼
postEditProduct (controller)
  → extract form fields + productId
  → new Product(..., id)   ← _id is set
       │
       ▼
product.save()
  → this._id exists?
      YES → updateOne({ _id }, { $set: this })
      NO  → insertOne(this)
       │
       ▼
MongoDB updates the document
       │
       ▼
Redirect to /admin/products
```

---

Next: [Finishing the Update Product Code](./14-finishing-the-update-product-code.md)
