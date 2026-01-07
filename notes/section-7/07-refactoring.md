## Refactoring

Here we even refactor the functions of the class to make it clearer.

```js
const pathData = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(pathData, (err, fileContent) => {
    if (err) {
      return cb([]);
    }

    cb(JSON.parse(fileContent));
  });
};
```

[Next: Warp-up](./wrap-up.md)
