## Serving HTML

[NodeJS: path](https://nodejs.org/api/path.html)

The node:path module provides utilities for working with file and directory paths. It can be accessed using:

```js
const path = require("path");
```

and then use path.join() method for connecting to file

```js
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});
```

dont forget to use \_\_dirname first

[Next: Returning 404 Page](./15-returning-a-404-page.md)
