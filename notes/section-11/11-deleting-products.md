# Deleting Product

```js
exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;

  Product.destroy({ where: { id } })
    .then(() => {
      console.log("Delete Product");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
```

Next: [Creating a user model](./12-creating-a-user-model.md)
