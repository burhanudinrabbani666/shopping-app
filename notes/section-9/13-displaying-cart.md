# Displaying the Cart

## Overview

The `getCart` controller fetches the user's cart and matches each cart entry to its full product details before rendering the cart page.

---

## Controller: `getCart`

```js
exports.getCart = (req, res, next) => {
  // Step 1: Fetch the cart (contains product IDs + quantities)
  Cart.getAllProducts((cart) => {
    // Step 2: Fetch all products from the database
    Product._fetchAll((products) => {
      const cartProducts = [];

      // Step 3: Match each product in the DB to its cart entry
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id,
        );

        // Only include products that exist in the cart
        if (cartProductData) {
          cartProducts.push({
            productData: product, // Full product info (title, price, etc.)
            qty: cartProductData.quantity, // Quantity from the cart
          });
        }
      }

      // Step 4: Render the cart view with the merged product list
      res.render("shop/cart", {
        pageTitle: "Cart - Shop",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};
```

---

## Data Shapes

**Cart object** — returned by `Cart.getAllProducts()`:

```json
{
  "products": [{ "id": "abc123", "quantity": 2 }],
  "totalPrice": 49.99
}
```

**Product object** — returned by `Product._fetchAll()`:

```json
{
  "id": "abc123",
  "title": "Example Product",
  "imageUrl": "https://...",
  "description": "A great product",
  "price": 24.99
}
```

**Merged cart item** — what gets passed to the view:

```json
{
  "productData": { "id": "abc123", "title": "Example Product", "price": 24.99 },
  "qty": 2
}
```

---

## How It Works

1. **Fetch the cart** — `Cart.getAllProducts()` retrieves the stored cart, which only holds product IDs and quantities (not full product details).
2. **Fetch all products** — `Product._fetchAll()` retrieves the complete product catalog from the database.
3. **Merge the data** — The `for` loop iterates over all products and uses `.find()` to check if each one exists in the cart. If it does, the full product data and its cart quantity are combined into one object.
4. **Render the view** — The merged `cartProducts` array is passed to the `shop/cart` template for display.

> **Why merge?** The cart intentionally stores only IDs and quantities to stay lightweight. Full product details are fetched separately and joined at render time.

---

## Key Notes

- **Callback nesting** — Both `getAllProducts` and `_fetchAll` are asynchronous and use callbacks, which is why they are nested. Consider refactoring to Promises or `async/await` to reduce nesting.
- **No cart = potential crash** — If `cart` or `cart.products` is `null`, the loop will throw. Ensure `Cart.getAllProducts` always returns a valid cart shape (e.g. `{ products: [] }`).
- **Products not in cart are ignored** — If a product exists in the DB but not in the cart, it is simply skipped.

---

Next: [Deleting Cart Items](./14-deleting-cart-items.md)
