# Making the edit and delete buttons work again

```js
exports.getProducts = (req, res) => {
  Product.fetchALl()
    .then((products) => {
      res.render("admin/products", {
        products,
        pageTitle: "Admin Product- Shop",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [Working on the product model to edit our product](./13-working-on-the-product-model-to-edit-our-product.md)
