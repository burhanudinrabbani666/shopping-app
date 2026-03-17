# Adding relational order data

This version of `addOrder` stores both the ordered items and a snapshot of
basic user data in the order document. That makes each order self-contained
and easy to display later.

## `addOrder` with user data

```js
  addOrder() {
    const db = getDB();

    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            username: this.username,
          },
        };

        // Store the order with both items and user snapshot.
        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        // Reset the in-memory cart.
        this.cart = { items: [] };

        // Clear the cart in the database for this user.
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } },
          );
      })
      .catch((error) => console.log(error));
  }
```

## Understanding: `addOrder`

1. Fetch cart items with product details using `getCart()`.
2. Build an `order` object that includes items and a user snapshot.
3. Insert the order into the `orders` collection.
4. Clear the cart both in memory and in MongoDB.

## Important Notes

- The user data is a snapshot, not a live reference.
- `getCart()` already merges product data with quantities.
- The cart is cleared only after the order insert succeeds.

## Benefits

- Orders are self-contained and can be rendered without extra joins.
- A snapshot protects historical orders from future user changes.
- Keeps cart state consistent after checkout.

## Complete Flow

1. The user submits an order from the cart page.
2. `getCart()` loads the detailed cart items.
3. The order is saved with both items and user info.
4. The cart is cleared and the request completes.

Next: [Getting orders](./28-getting-orders.md)
