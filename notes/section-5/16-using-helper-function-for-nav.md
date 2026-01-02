## using helper function for navigation

we creating new file to navigate and make more clean code. this helper make the dirname pointing to the root fields. so we just enter the folder we want after that.

```js
// util/path.js
const path = require("path");

module.exports = path.dirname(require.main.filename);
```

```js
// admin.js
const routDir = require("../util/path");

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(routDir, "views", "add-product.html"));
});
```

[Next: Serving file staticlly](./17-serving-files-staticlly.md)
