# Adding an order

This step creates an order from the current cart and then clears the cart.
At this point, we store only the cart data in the `orders` collection; user
details are added in the next lesson.

## `addOrder`

```js
  addOrder() {
    const db = getDB();

    return db
      .collection("orders")
      // Store the cart snapshot as an order.
      .insertOne(this.cart)
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

1. Insert the current cart contents into the `orders` collection.
2. Reset the in-memory cart to keep the user model in sync.
3. Persist the empty cart on the user document in MongoDB.

## Important Notes

- This version of the order only stores cart items, not user info.
- The cart is cleared only after the order insert succeeds.
- The method returns a promise so callers can chain or await it.

## Benefits

- Creates a simple order record with the cart snapshot.
- Prevents stale cart items from lingering after checkout.
- Keeps in-memory and database state consistent.

## Complete Flow

1. A user submits the order from the cart.
2. `addOrder()` saves the cart as an order document.
3. The user's cart is cleared in memory and in MongoDB.
4. The request completes and the user sees an empty cart.

Next: [Adding relational order data](./27-adding-relational-order-data.md)
