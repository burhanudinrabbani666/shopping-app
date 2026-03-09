# Getting a single product with the where condition

```js
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({
    where: { id: productId },
  })
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: `Shop - ${product.title}`,
        path: `/products`, // to highlight the nav
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [Fetching admin products](./9-fetching-admin-products.md)
