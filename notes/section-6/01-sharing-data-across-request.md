## Sharing Data Accross Request

Implementing data storage in regular variables first. A side effect is that the data can be accessed by other users on the same server, which can be dangerous if the data is private.

```js
// admin.js
const products = [];

router.post("/add-product", (req, res, next) => {
  products.push("Shop.js", { title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.product = products;
```

```js
// shop.js

const adminData = require("./admin");
router.get("/", (req, res, next) => {
  console.log(adminData.product);
  res.sendFile(path.join(routDir, "views", "shop.html"));
});
```

```js
// app.js
const adminData = require("./routes/admin");
const shopRoute = require("./routes/shop");

// Middleware
app.use(shopRoute);
app.use("/admin", adminData.routes);
```

[Next: Template Engines](./02-template-engines.md)
