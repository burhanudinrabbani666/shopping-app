# Adding the add to cart functionality

In this step we connect the user object to each request and then use that
object to add a product to the cart. We will:

1. Attach a full `User` instance to `req.user`.
2. Call `req.user.addToCart(product)` in the cart controller.
3. Store product IDs in the user document's `cart`.

```js
app.use((req, _, next) => {
  return User.findUserById("69b8c1e3b387ed269d055ffd")
    .then((user) => {
      req.user = new User(user.username, user.name, user.cart, user._id);

      next();
    })
    .catch((error) => console.log(error));
});
```

```js
exports.postCart = (req, res) => {
  const id = req.body.productId;
  Product.findById(id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};
```

```js
  addToCart(product) {
    const db = getDB();

    // We only store the product ID for now.
    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } },
      );
  }
```

Next: [Storing multiple products in the cart](./22-storing-multiple-products-in-the-cart.md)
