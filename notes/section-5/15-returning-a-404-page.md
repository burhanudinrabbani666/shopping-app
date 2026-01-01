## Retruning 404 Page

also adding 404 page

```js
const path = require("path");

app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
```

[Next: Filltering Path](./16-using-helper-function-for-nav.md)
