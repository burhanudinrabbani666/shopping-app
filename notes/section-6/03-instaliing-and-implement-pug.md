## PUG

[PUG](https://pugjs.org/api/getting-started.html)

The general rendering process of Pug is simple. pug.compile() will compile the Pug source code into a JavaScript function that takes a data object (called “locals”) as an argument. Call that resultant function with your data, and voilà!, it will return a string of HTML rendered with your data.

The compiled function can be re-used, and called with different sets of data.

## express.set()

```js
app.set("view engine", "pug"); // Set view engine to pug
app.set("views", "views");
```

The default engine extension to use when omitted.
NOTE: Sub-apps will inherit the value of this setting.

## Using PUG

```js
router.get("/", (req, res, next) => {
  // console.log(adminData.product);
  // res.sendFile(path.join(routDir, "views", "shop.html"));

  // this is because we have done telling node to views pug as view engine
  res.render("shop");
});
```

PUG html

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title My Shop
    link(rel="stylesheet", href="/css/style.css")
    link(rel="stylesheet", href="/css/product.css")
  body
      header.main-header
        nav.main-header__nav
          ul.main-header__item-list
            li.main-header__item
              a.active(href="/") Shop
            li.main-header__item
              a(href="/admin/add-product") Add Product
```

[Next: Outplaying Dinamic Content ](./04-outplaying-dynamic-content.md)
