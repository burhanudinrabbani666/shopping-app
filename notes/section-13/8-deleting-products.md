# Deleting product

```js
exports.postDeleteProduct = (req, res) => {
  const id = req.body.productId;

  Product.findOneAndDelete(id)
    .then(() => res.redirect("/admin/products"))
    .catch((error) => console.log(error));
};
```

Next: [Adding and using a model](./9-adding-and-using-a-user-model.md)
