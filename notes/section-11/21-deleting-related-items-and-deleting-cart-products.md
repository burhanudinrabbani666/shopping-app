# Deleting Cart Products

## Overview

To remove a product from the cart, you don't delete from `products` — you delete the **junction table row** in `cart_items`. This cleanly removes the link between the cart and that product without affecting the product itself.

---

## Handler (`shop.js`)

```js
exports.postCartDeleteProduct = (req, res) => {
  const id = req.body.productId; // Product ID sent from the delete form

  req.user
    .getCart()
    .then((cart) => {
      // Fetch only the product that matches the given ID within this cart
      return cart.getProducts({ where: { id } }); // Sequelize magic method
    })
    .then((products) => {
      const product = products[0];

      // product.cart_items is the junction table row for this cart+product pair
      // Calling destroy() on it deletes that row from cart_items — not the product itself
      return product.cart_items.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};
```

---

## How It Works

### What Gets Deleted

```
products table        cart_items table         carts table
┌────────────┐        ┌────────────────-──┐     ┌──────────┐
│ id │ name  │        │ cartId │ productId│     │ id │ ... │
│  1 │ Shirt │   ✗    │   1    │    1     │     │  1 │ ... │
│  2 │ Shoes │        │   1    │    2     │     └──────────┘
└────────────┘        └─────────────-─────┘
                           ↑
                    Only this row is destroyed
```

`product.cart_items.destroy()` removes the row from `cart_items` only. The product record in the `products` table is untouched.

### Why `cart_items` Is Accessible on the Product

When you call `cart.getProducts()`, Sequelize automatically joins and attaches the matching `cart_items` row to each returned product instance. This is the same behavior covered in the previous section — you get the junction row for free without querying it directly.

---

## Key Notes

- **Never call `product.destroy()`** here — that would delete the product from the store entirely, not just remove it from the cart
- **`product.cart_items.destroy()`** targets only the junction row — the correct and safe operation
- `cart.getProducts({ where: { id } })` returns an array, so `products[0]` is used to get the single match
- The single `.catch()` at the end covers all errors in the chain

---

Next: [Adding an Order Model](./22-adding-an-order-model.md)
