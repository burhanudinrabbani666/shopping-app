# Displaying the cart items

To render a cart page with real product data, we need to fetch the products
from the `products` collection and then merge in the cart quantities.

## `User.getCart`

```js
// class User
  getCart() {
    const db = getDB();

    // Collect product IDs from the cart so we can query them in MongoDB.
    const productId = this.cart.items.map((item) => item.productId);

    return db
      .collection("products")
      // Use $in to fetch all products whose _id is in the cart list.
      .find({ _id: { $in: productId } })
      .toArray()
      .then((products) => {
        const productToRender = products.map((product) => {
          return {
            ...product,
            // Find the matching cart item to attach its quantity.
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() == product._id.toString();
            }).quantity,
          };
        });

        return productToRender;
      })
      .catch((error) => console.log(error));
  }
```

## Understanding: `getCart`

1. Read all product IDs from the cart.
2. Query MongoDB using `$in` to fetch all matching products in one call.
3. Merge each product with its cart quantity.
4. Return the merged array for rendering.

## Cart Controller

```js
exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((products) => {
      // Pass the merged products + quantities to the cart view.
      res.render("shop/cart", {
        pageTitle: "Cart - Shop",
        path: "/cart",
        products,
      });
    })
    .catch((error) => console.log(error));
};
```

## Understanding: `getCart` controller

1. Call `req.user.getCart()` to fetch enriched cart items.
2. Render the `shop/cart` view with the products array.

## Important Notes

- If `this.cart.items` is empty, the query returns an empty array and the cart renders without items.
- We merge quantity from the cart, not from the product document.
- The method returns a promise, so the controller can chain `.then()` or use `await`.

## Benefits

- Single query to MongoDB for all products in the cart.
- Keeps the cart display accurate by attaching quantities.
- Clean separation between model logic and controller rendering.

## Complete Flow

1. The user hits `/cart`.
2. The controller calls `req.user.getCart()`.
3. The user model queries all product records in one request.
4. Each product is merged with its cart quantity.
5. The controller renders the cart view with the enriched products array.

Next: [Fixing a bug](./24-fixing-a-bug.md)
