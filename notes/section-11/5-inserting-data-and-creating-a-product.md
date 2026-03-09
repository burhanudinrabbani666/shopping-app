# Inserting Data and Creating product

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

Next: [](./6-must-read-findbyid-in-sequelize-5.md)
