## Finishing pug template

adding more dinamic

```js
// admin.js
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

// shop
router.get("/", (req, res, next) => {
  const products = adminData.product;
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/shop" });
});
```

```pug
//- main-layout.pug

header.main-header
      nav.main-header__nav
        ul.main-header__item-list
          li.main-header__item
            a(href="/", class=(path === '/shop'? "active" : "")) Shop
          li.main-header__item
            a(href="/admin/add-product", class=(path === '/admin/add-product' ? "active" : "")) Add Product
```

[Next: Working with handlebars](./08-working-with-handlebars.md)
