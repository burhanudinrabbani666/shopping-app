# Resetting the Cart & Fetching Orders

## Overview

This document covers two final pieces: clearing the cart after checkout, and fetching a user's complete order history with products included.

---

## Part 1 — Post Order with Cart Reset (`shop.js`)

```js
exports.postOrder = (req, res) => {
  let fetchedCart; // Hoisted so it's accessible across all .then() steps

  req.user
    .getCart() // Step 1: Get the user's cart
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts(); // Step 2: Get all products (with cart_items attached)
    })
    .then((products) => {
      return req.user
        .createOrder() // Step 3: Create a new order row (userId set automatically)
        .then((order) => {
          return order.addProducts(
            // Step 4: Link products to the order via order_items
            products.map((product) => {
              // Copy quantity from cart_items → order_items
              product.order_items = { quantity: product.cart_items.quantity };
              return product;
            }),
          );
        })
        .then(() => {
          return fetchedCart.setProducts(null); // Step 5: Clear all products from the cart
        })
        .then(() => {
          res.redirect("/orders"); // Step 6: Redirect to orders page
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
```

### How `setProducts(null)` Works

`setProducts()` is a magic method generated from `Cart.belongsToMany(Product, { through: CartItem })`. Passing `null` removes all rows in `cart_items` for this cart — without deleting the cart itself or any products.

```
Before checkout          After setProducts(null)
─────────────────        ───────────────────────
cart_items               cart_items
 cartId │ productId       (empty)
   1    │    1
   1    │    2
```

---

## Part 2 — Fetch Orders with Products (`shop.js`)

```js
exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] }) // Eager load products in a single query
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your orders - Shop",
        path: "/orders",
        orders, // Each order has a .products array with order_items.quantity attached
      });
    })
    .catch((error) => console.log(error));
};
```

---

## Complete Checkout Flow

```
POST /create-order
  └── getCart()
        └── cart.getProducts()                     ← products + cart_items.quantity
              └── createOrder()                    ← new row in orders table
                    └── order.addProducts()        ← new rows in order_items table
                          └── setProducts(null)    ← cart_items cleared
                                └── redirect("/orders")

GET /orders
  └── getOrders({ include: ["products"] })         ← orders + order_items + products in one query
        └── render("shop/orders", { orders })
```

---

## Key Notes

- **`setProducts(null)`** clears `cart_items` without deleting the cart or the products themselves
- **`fetchedCart` is hoisted** with `let` so it's reachable in the `setProducts()` step, which is inside a nested `.then()`
- **`include: ["products"]`** prevents N+1 queries — all orders and their products are fetched in one JOIN instead of one query per order
- **`order_items.quantity`** is automatically attached to each product in the orders view, same as `cart_items` was in the cart

---

Next: [Wrap Up](./25-wrap-up.md)
