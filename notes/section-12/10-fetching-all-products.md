# Fetching all products

```js
// Product

  static fetchALl() {
    const db = getDB();

    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);

        return products;
      })
      .catch((error) => console.log(error));
  }
```

implement in controller

```js
exports.getProducts = (req, res) => {
  Product.fetchALl()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products - Shop",
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};
```

Next: [Fetching a single product](./11-fetching-a-single-product.md)
