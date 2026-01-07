const fs = require("fs");
const path = require("path");

const pathFile = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductFromFile = (callBack) => {
  // Async
  fs.readFile(pathFile, (error, fileContent) => {
    if (error) {
      return callBack([]);
    }

    callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  _save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(pathFile, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static _fetchAll(callBack) {
    getProductFromFile(callBack);
  }
};
