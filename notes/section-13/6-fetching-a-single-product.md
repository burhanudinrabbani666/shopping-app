# Fetching a single Product

Docs: https://mongoosejs.com/docs/api/model.html#Model.findById()

```js
exports.getProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((productData) => {
      if (!productData) return res.redirect("/");

      const product = { ...productData._doc, _id: productData._id.toString() };

      res.render("shop/product-detail", {
        product,
        pageTitle: `Shop - ${product.title}`,
        path: null,
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [Updating products] (./7-updating-products.md)
