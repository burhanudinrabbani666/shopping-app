# Storing multiple products in the cart

This step upgrades `addToCart` so it can handle multiple items by either
incrementing the quantity of an existing product or adding a new product
entry when it is not yet in the cart.

## Updated `addToCart`

```js
  addToCart(product) {
    const db = getDB();

    // Find the cart item (if any) that matches the product we are adding.
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString(),
    );

    // Start with quantity 1 for a new product.
    let newQuantity = 1;
    // Clone items to avoid mutating the original array directly.
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      // Product already exists in cart: increment quantity.
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      // Product not in cart yet: add a new entry.
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = { items: updatedCartItems };

    // Persist the updated cart on the user document.
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } },
      );
  }
```

## Understanding: `addToCart`

1. We locate the product in the cart by comparing IDs.
2. If a match exists, we increment its quantity.
3. If there is no match, we push a new item with quantity 1.
4. We write the updated cart back to the user document in MongoDB.

## Important Notes

- `this.cart.items` must be initialized (for example, an empty array on new users).
- We store only `productId` and `quantity`, keeping the user document small.
- The method returns the MongoDB update promise so callers can chain or await it.

## Benefits

- Prevents duplicate cart entries for the same product.
- Keeps quantities accurate without extra queries.
- Works for both first-time adds and repeat adds with a single method.

## Complete Flow

1. The controller receives a product ID from the request.
2. The product is loaded from the products collection.
3. `req.user.addToCart(product)` checks the cart for that product.
4. The cart array is updated (quantity incremented or new entry added).
5. The user document is updated in MongoDB and the promise resolves.

Next: [Displaying the cart items](./23-displaying-the-cart-items.md)
