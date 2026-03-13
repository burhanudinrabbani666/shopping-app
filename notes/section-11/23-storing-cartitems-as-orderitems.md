# Storing Cartitems as Order items

## Overview

When a user checks out, this handler converts their cart into a permanent order. It reads the quantity from each `cart_items` row and writes it into `order_items` — preserving the purchase snapshot.

---

## Handler (`shop.js`)

```js
exports.postOrder = (req, res) => {
  req.user
    .getCart() // Step 1: Get the user's cart
    .then((cart) => {
      return cart.getProducts(); // Step 2: Get all products in the cart (with cart_items attached)
    })
    .then((products) => {
      return req.user
        .createOrder() // Step 3: Create a new order record for this user (magic method)
        .then((order) => {
          return order.addProducts(
            // Step 4: Link all products to the order via order_items
            products.map((product) => {
              // Copy quantity from cart_items → order_items
              // This is how you set extra fields on the junction table with addProducts()
              product.order_items = { quantity: product.cart_items.quantity };
              return product;
            }),
          );
        })
        .then(() => {
          res.redirect("/orders"); // Step 5: Redirect to orders page
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
```

---

## How It Works

### `createOrder()` — Magic Method

`createOrder()` is auto-generated from `User.hasMany(Order)`. It creates a new row in the `orders` table with the `userId` foreign key already set — no manual assignment needed.

### Setting Junction Table Data with `addProducts()`

`addProducts()` is the plural form of `addProduct()`, accepting an array. To write extra fields into the `order_items` junction table, you set them directly on the product instance before passing it in:

```js
product.order_items = { quantity: product.cart_items.quantity };
```

Sequelize reads `product.order_items` and uses those values when inserting each row into `order_items`.

### Data Flow

```
cart_items table                      order_items table
┌─────────────────────────┐           ┌─────────────────────────┐
│ cartId │ productId │ qty │  ──────▶  │ orderId │ productId │ qty│
│   1    │     1     │  2  │           │    5    │     1     │  2 │
│   1    │     2     │  1  │           │    5    │     2     │  1 │
└─────────────────────────┘           └─────────────────────────┘
         quantity copied here ──────────────────────────────────▶
```

### Full Step Flow

```
POST /create-order
  └── req.user.getCart()
        └── cart.getProducts()                    ← products with cart_items attached
              └── req.user.createOrder()          ← new row in orders table
                    └── order.addProducts(...)    ← new rows in order_items table
                          └── res.redirect("/orders")
```

---

## Key Notes

- **`createOrder()`** is generated from `User.hasMany(Order)` — it creates the order and sets `userId` automatically
- **`product.order_items = {...}`** is how you pass junction table data to `addProducts()` — same concept as `through: { quantity }` in `addProduct()`, just a different syntax for bulk operations
- **`cart_items` is already attached** on each product from `cart.getProducts()`, so you can read `.quantity` directly without another query
- ⚠️ This handler doesn't clear the cart after checkout — that step should follow `addProducts()` in a production app

---

Next: [Resetting the cart and fetching and outputting orders](./24-resetting-the-cart-and-fetching-and-outputting-orders.md)
