# Using magic Association methods

```js
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // This sequilize syntax for connecting user id to product
  req.user
    .createProduct({ title, imageUrl, price, description })
    .then(() => {
      console.log(`${title} Succesfully Crearted`);

      res.redirect("/");
    })
    .catch((error) => console.log(error));
};
```

Next: [Fetching related products](./16-fetching-related-products.md)
