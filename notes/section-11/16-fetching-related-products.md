# Fetching Related products

```js
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect("/");
  }

  const productId = req.params.productId;

  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];

      if (!product) return res.redirect("/");

      res.render("admin/edit-product", {
        pageTitle: "Edit product - Shop",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (req, res) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Product- Shop",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [One to many and many to many relations](./17-one-to-many-and-many-to-many-relations.md)
