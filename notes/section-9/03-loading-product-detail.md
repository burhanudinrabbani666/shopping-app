## Loading Product Detail

add new function to take data by id

```js
// Models/ models-product.js

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }
```

respons sending data to client

```js
exports.getProduct = (req, res, next) => {
  // Render data
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    console.log(product);
  });

  res.redirect("/");
};
```

[Next: Rendering detail](./04-rendering-detail.md)
