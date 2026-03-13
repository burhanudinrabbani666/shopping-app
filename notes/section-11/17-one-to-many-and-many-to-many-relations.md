# Sequelize: One-to-Many & Many-to-Many Relations

## Overview

This document covers how to model relationships between database tables using Sequelize — specifically a **User → Product** (one-to-many) and a **Cart ↔ Product** (many-to-many) scenario.

---

## Models

### Cart Model (`cart.js`)

```js
const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
```

> A simple model representing a shopping cart. Each cart belongs to one user.

### CartItem Model (`cart-item.js`)

```js
// NOTE: Use snake_case for table names in PostgreSQL — avoid camelCase
const CartItem = sequelize.define("cart_items", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER, // How many of a product is in the cart
});
```

> `CartItem` is the **junction table** that links `Cart` and `Product` in a many-to-many relationship. It also stores extra data (`quantity`) about each cart-product pair.

> ⚠️ **PostgreSQL Naming:** Always use `snake_case` for table names in PostgreSQL. CamelCase names can cause quoting issues and unexpected behavior.

---

## Associations (`app.js`)

```js
// A Product belongs to a User (foreign key: userId on products table)
// onDelete: "CASCADE" means if the user is deleted, their products are too
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// A User can have many Products
User.hasMany(Product);

// A User has one Cart
User.hasOne(Cart);

// A Cart belongs to a User (foreign key: userId on carts table)
Cart.belongsTo(User);

// Many-to-many: A Cart can have many Products, linked through CartItem
Cart.belongsToMany(Product, { through: CartItem });

// Many-to-many (inverse): A Product can appear in many Carts
Product.belongsToMany(Cart, { through: CartItem });
```

---

## How It Works

### One-to-Many (User → Product)

```
User ──< Products
```

One user can own many products. Sequelize adds a `userId` foreign key to the `products` table automatically. The `CASCADE` rule means deleting a user also deletes all their products.

### Many-to-Many (Cart ↔ Product via CartItem)

```
Cart >──< CartItem >──< Product
```

A cart can hold many products, and a product can appear in many carts. The `cart_items` table sits in the middle, holding foreign keys for both sides plus extra info like `quantity`.

---

## Complete Association Flow

```
User
 ├── has many → Products  (userId on products table)
 └── has one  → Cart      (userId on carts table)

Cart
 ├── belongs to → User
 └── belongs to many → Products  (through cart_items)

Product
 ├── belongs to → User
 └── belongs to many → Carts     (through cart_items)
```

---

## Key Notes

- **`through: CartItem`** — tells Sequelize to use `cart_items` as the join table
- **`onDelete: "CASCADE"`** — automatically removes child records when the parent is deleted
- **Always define both sides** of a `belongsToMany` so Sequelize can query in either direction
- **snake_case table names** are strongly recommended for PostgreSQL compatibility

Next: [Creating and Fetching a Cart](./18-creating-and-fetching-a-cart.md)
