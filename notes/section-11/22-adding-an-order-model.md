# Adding an Order Model

## Overview

An order captures a snapshot of what a user purchased. Like the cart, it connects to products through a junction table — `OrderItem` — which stores the quantity of each product at the time of purchase.

---

## The Order Model (`order.js`)

```js
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
```

---

## Associations (`app.js`)

```js
// A User can place many Orders
User.hasMany(Order);

// Each Order must belong to a User (adds userId foreign key to orders table)
Order.belongsTo(User);

// An Order can contain many Products, linked through OrderItem junction table
Order.belongsToMany(Product, { through: OrderItem });

// A Product can appear in many Orders
Product.belongsToMany(Order, { through: OrderItem });
```

> Both sides of `belongsToMany` should be defined so Sequelize can query in either direction.

---

## How It Works

The `Order` model mirrors the same pattern as `Cart`, just with a different lifecycle — a cart is temporary and mutable, an order is permanent.

```
User
 └── has many → Orders

Order
 ├── belongs to → User
 └── belongs to many → Products  (through order_items)

Product
 └── belongs to many → Orders    (through order_items)
```

### Cart vs. Order — What's the Difference?

|                | Cart                   | Order                         |
| -------------- | ---------------------- | ----------------------------- |
| Purpose        | Temporary, in-progress | Permanent, completed purchase |
| Junction table | `cart_items`           | `order_items`                 |
| Created        | On first add to cart   | When user checks out          |
| Deleted        | Items removed freely   | Never deleted                 |

---

## Key Notes

- **`quantity` goes on `OrderItem`**, not `Order` — an order contains multiple products each with their own quantity
- **Always define both sides** of `belongsToMany` (`Order ↔ Product`) so magic methods work in both directions
- The `OrderItem` model (junction table) should be created separately, mirroring `CartItem`

---

Next: [Storing Cart Items as Order Items](./23-storing-cartitems-as-orderitems.md)
