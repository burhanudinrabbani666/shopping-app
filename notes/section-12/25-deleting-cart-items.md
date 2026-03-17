# Deleting cart items

```js
  deleteItemsFromCart(id) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== id,
    );

    // Set to database again
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } },
      );
  }
```

Next: [Adding an order](./26-adding-an-order.md)
