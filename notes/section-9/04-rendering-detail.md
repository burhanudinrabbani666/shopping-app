## Rendering Detail

now we connect to our product detail file.

```js
exports.getProduct = (req, res, next) => {
  // Render data
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      // make single data
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};
```

[Next: Passing deta with post](./05-passing-data-with-post.md)
