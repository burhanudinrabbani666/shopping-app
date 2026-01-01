## Fetching Data

```js
exports.getProduct = (req, res, next) => {
  console.log("REQUEST / START");
  // Render data
  Product.fetchAll((products) => {
    console.log("RENDER");
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProduct: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
```

Here, I created a nodemon.json file to allow CSS to be loaded directly. Without it, nodemon would automatically refresh and cause the CSS file to fail to render after entering data from the form.

```json
{
  "ignore": ["data/*"]
}
```

[Next: Warp up](./wrap-up.md)
