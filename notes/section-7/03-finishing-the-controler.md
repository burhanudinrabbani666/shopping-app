## Finishing Controller

```js
exports.errorHandling = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};
```

[Next: Adding Product Model](./04-adding-product-model.md)
