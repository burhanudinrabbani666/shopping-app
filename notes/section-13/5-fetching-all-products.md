# Fetching all Products

Docs: https://mongoosejs.com/docs/api/model.html#Model.find()

```js
exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      console.log(products);

      res.render("admin/products", {
        products,
        pageTitle: "Admin Product- Shop",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [Fetching a single product](./6-fetching-a-single-product.md)
