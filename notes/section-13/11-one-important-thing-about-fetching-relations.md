# One important thing about fetching relations

You can select or populate other fields

```js
exports.getProducts = (req, res) => {
  Product.find()
    // .select("ti")
    // .populate("userId") // This make get all data of userId
    .then((productsData) => {
      const products = productsData.map((product) => {
        return {
          ...product._doc,
          _id: product._id.toString(),
        };
      });

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

Next: [Working on the shopping cart](./12-working-on-the-shopping-cart.md)
