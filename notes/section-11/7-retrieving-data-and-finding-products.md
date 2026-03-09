# Retriving data and finding products

```js
exports.getIndex = (req, res, next) => {
  Product.findAll() // sequileze models syntax
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products - Shop",
        path: "/",
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [Getting a single product with the where condition](./8-getting-a-single-product-with-the-where-condition.md)
