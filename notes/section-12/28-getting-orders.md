# Getting orders

This method fetches all orders for the current user and prepares them for
rendering by converting MongoDB `ObjectId` values into strings.

## `getOrders`

```js
  getOrders() {
    const db = getDB();

    return db
      .collection("orders")
      // Find orders that belong to this user.
      .find({ "user._id": new ObjectId(this._id) })
      .toArray()
      .then((orders) => {
        const orderToRender = orders.map((order) => {
          // Convert ObjectId fields to strings for easy template usage.
          const newOrder = {
            ...order,
            _id: order._id.toString(),
            user: { ...order.user, _id: order.user._id.toString() },
          };

          return newOrder;
        });

        return orderToRender;
      })
      .catch((error) => console.log(error));
  }
```

## Understanding: `getOrders`

1. Query the `orders` collection for the current user's `_id`.
2. Convert `ObjectId` values to strings so templates can render them safely.
3. Return the transformed array for the controller or view.

## Important Notes

- This relies on orders being saved with a `user._id` field.
- You can skip the conversion step if your templates handle `ObjectId`s.
- The method returns a promise so callers can chain or `await` it.

## Benefits

- Fetches all orders in a single database query.
- Keeps render logic simple by normalizing IDs.
- Ensures only the current user's orders are returned.

## Complete Flow

1. The user visits the orders page.
2. The controller calls `req.user.getOrders()`.
3. Orders are fetched and their IDs are normalized for the view.
4. The orders list is rendered in the template.

Next: [Removing deleted items from the cart](./29-removing-deleted-items-from-the-cart.md)
