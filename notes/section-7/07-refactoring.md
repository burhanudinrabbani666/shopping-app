## Refactoring

disini kita bahkan merefactor Ffngsi dari class supyaa lebih jelas

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
