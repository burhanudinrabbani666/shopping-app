## Create Product model

Create a models folder first so it's easier to find. then create a JavaScript file specifically for models as below

```js
const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};
```

then use the models to the file you want to use it

```js
// /controller/products.js

// Importing models
const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  // save in variable
  const product = new Product(req.body.title);

  // Using Save Method
  product.save();

  res.redirect("/");
};

exports.getProduct = (req, res, next) => {
  // Render data
  const products = Product.fetchAll();

  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProduct: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
```

[Next: Storing Data](./05-storing-data.md)
