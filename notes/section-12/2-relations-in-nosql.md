# Relations in NoSQL

> **Context:** Coming from SQL/Sequelize, understanding how NoSQL handles relationships is a key mindset shift.

## The Core Difference

| Concept   | SQL (Relational)              | NoSQL (MongoDB)                        |
| --------- | ----------------------------- | -------------------------------------- |
| Structure | Separate tables, foreign keys | Embedded documents or references       |
| Joins     | `JOIN` queries across tables  | Either embed data or use `populate()`  |
| Schema    | Enforced at DB level          | Flexible, enforced in app layer        |
| Relations | Defined by the DB engine      | Defined by how you structure documents |

## Two Approaches to Relations in NoSQL

### 1. Embedded Documents (Denormalization)

Store related data **inside** the same document.

```js
// A user document with embedded orders
{
  _id: "u1",
  name: "Bani",
  orders: [
    { product: "Laptop", quantity: 1, price: 1200 },
    { product: "Mouse",  quantity: 2, price: 25  }
  ]
}
```

**When to use:** Data that is always read together, rarely updated independently (e.g., order history, addresses).

### 2. References (Normalization)

Store a reference (ID) to another document — similar to a foreign key.

```js
// Order document referencing a user by ID
{
  _id: "o1",
  userId: "u1",   // ← reference to the User collection
  product: "Laptop",
  quantity: 1
}
```

**When to use:** Data shared across many documents, or updated frequently (e.g., user profile, product catalog).

## Key Takeaway

> NoSQL doesn't eliminate relationships — it changes **where** and **how** you store them.  
> You choose the strategy based on your read/write patterns, not on DB rules.

Next: [Setting up MongoDB](./3-setting-up-mongodb.md)
