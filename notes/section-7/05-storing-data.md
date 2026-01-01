## Storing Data

Now we no longer store data in variables. We use files with fs and paths to connect the controller and the data folder.

```js
const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const pathData = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );

    fs.readFile(pathData, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);

      // Create JSON folder to server
      fs.writeFile(pathData, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll() {
    const pathData = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );

    fs.readFile(pathData, (err, fileContent) => {
      if (err) {
        return [];
      }

      return JSON.parse(fileContent);
    });
  }
};
```

[Next: Fetching Data](./06-fetching-data.md)
