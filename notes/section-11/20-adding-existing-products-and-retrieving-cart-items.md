# Adding Existing Products & Retrieving Cart Items

## Overview

This is the completed version of `postCart`. It now handles both cases: adding a **new** product (quantity = 1) and incrementing an **existing** product's quantity by reading from the `cart_items` junction table.

---

## Handler (`shop.js`)

```js
exports.postCart = (req, res) => {
  const id = req.body.productId;
  let fetchedCart;
  let newQuantity = 1; // Default for a brand-new cart item — hoisted so all steps can access it

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart; // Save cart for use in a later step

      // Check if this product is already in the cart
      return cart.getProducts({ where: { id } });
    })
    .then((products) => {
      const product = products.length > 0 ? products[0] : null;

      if (product) {
        // Product already in cart — read current quantity from the junction table
        const oldQuantity = product.cart_items.quantity; // cart_items is the through/junction table
        newQuantity = oldQuantity + 1;

        // Return the existing product — no need to fetch it again
        return product;
      }

      // Product not in cart — fetch the full record from the products table
      return Product.findByPk(id);
    })
    .then((product) => {
      // addProduct() handles both INSERT and UPDATE on cart_items automatically:
      // - New product → inserts a new row in cart_items
      // - Existing product → updates the quantity on that row
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((error) => console.log(error));
};
```

---

## How It Works

### Reading from the Junction Table

When Sequelize fetches products via a `belongsToMany` association, it attaches the matching `cart_items` row directly onto each product instance:

```js
product.cart_items.quantity; // The quantity stored in the cart_items row for this product+cart pair
```

You don't query `cart_items` directly — Sequelize joins it automatically and exposes it as a property.

### The Two Paths

```
cart.getProducts({ where: { id } })
  │
  ├── Product found (already in cart)
  │     └── read product.cart_items.quantity
  │     └── newQuantity = oldQuantity + 1
  │     └── return existing product  ← skip findByPk()
  │
  └── Product not found (new to cart)
        └── Product.findByPk(id)     ← fetch from products table
        └── newQuantity stays at 1
```

### Why `addProduct()` Works for Both Cases

`addProduct()` is smart — Sequelize checks whether a row already exists in `cart_items` for this cart+product pair:

| Scenario                | What `addProduct()` does                                     |
| ----------------------- | ------------------------------------------------------------ |
| Product is new to cart  | `INSERT` into `cart_items` with `quantity: 1`                |
| Product already in cart | `UPDATE` the existing `cart_items` row with the new quantity |

---

## Refactored vs. Previous Version

The previous version had a nested `.then()` inside `.then()`. This version flattens the chain by returning the product (either existing or freshly fetched) from a single `.then()` block, keeping all steps at the same level.

```
Before: .then → .then(nested .then) → .then → .then
After:  .then → .then              → .then → .then  ✓
```

---

## Key Notes

- **`product.cart_items`** is auto-attached by Sequelize when fetching via a `belongsToMany` association — it represents the junction table row
- **`addProduct()` upserts** — it inserts or updates depending on whether the row already exists in `cart_items`
- **`newQuantity` is hoisted** to `let` so it flows cleanly across `.then()` steps without nesting
- The single `.catch()` at the end covers all errors in the entire chain

---

Next: [Deleting Related Items and Deleting Cart Products](./21-deleting-related-items-and-deleting-cart-products.md)
