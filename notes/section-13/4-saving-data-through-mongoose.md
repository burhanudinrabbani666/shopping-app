# Saving data through Mongoose

```js
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product({ title, price, description, imageUrl }); // With Product schema

  product
    .save()
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch();
};
```

Next: [Fetching all products](./5-fetching-all-products.md)
