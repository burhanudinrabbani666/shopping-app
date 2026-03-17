# Working on cart items and orders

```js
  addToCart(product) {
    const db = getDB();

    const updatedCart = { items: [{ ...product, quatity: 1 }] };

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } },
      );
  }
```

Next: [Adding the add to cart functionality](./21-adding-the-add-to-cart-functionality.md)
