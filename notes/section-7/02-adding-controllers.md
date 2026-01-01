## Adding a Controller

We separate logic from its methods or modules, allowing the logic to be used multiple times in multiple places.

```js
// contorller.js

const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProduct = (req, res, next) => {
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

```js
// admin.js

const producContrller = require("../controllers/products");

// /admin/add-product => GET
router.get("/add-product", producContrller.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", producContrller.postAddProduct);
```

## Why Use Controllers?

As your Express.js application grows, managing all the logic directly inside your files can quickly become messy and hard to maintain. This is where controllers come into play. Controllers help you separate the routing logic from the business logic, making your code cleaner, more organized, and easier to manage. By using controllers, you can structure your project in a modular way, which improves readability, promotes reusability, and allows your application to scale efficiently.

- Separation of Concerns: It keeps route definitions clean by moving logic to separate files.
- Modularity: It makes your code reusable and testable.
- Maintainability: It is easier to update or refactor logic when it's not tightly coupled with routes.
- Scalability: It is easier to manage as the application grows.

[Geeks: Contoller in express.js](https://www.geeksforgeeks.org/web-tech/controllers-in-expressjs/)

---

[Next: Finishing Controller](./03-finishing-the-controler.md)
