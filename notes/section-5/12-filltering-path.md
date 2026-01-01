## Filtering Path

```js
app.use("/admin", adminRoute);
```

```js
// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.send(
    `<form action="/admin/add-product" method="POST"><input type="text" name="title" ><button type="submit">Add To cart</button>
    </form>`
  );
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
```

[Next: Creating HTML Pages](./13-creating-html-pages.md)
